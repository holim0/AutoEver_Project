import { http, HttpResponse } from 'msw';
import { z } from 'zod';
import { categoryIdToName, createErrorResponse, getNextOffset } from './utils';

import faqCategory from './data/faq-categroy.json';
import faq from './data/faq.json';
import terms from './data/terms.json';

type FAQ_CATEGORY_KEY = keyof typeof faqCategory;
type TERMS_KEY = keyof typeof terms;

const faqQuerySchema = z.object({
  limit: z.preprocess(
    (val) => {
      if (typeof val !== 'string' && typeof val !== 'number') {
        return NaN;
      }
      return Number(val);
    },
    z
      .number({
        message: 'Invalid limit parameter. Must be a number.',
      })
      .int({ message: 'Limit must be an integer.' })
      .positive({ message: 'Limit must be a positive number.' })
  ),
  offset: z.preprocess(
    (val) => {
      if (typeof val !== 'string' && typeof val !== 'number') {
        return NaN;
      }
      return Number(val);
    },
    z
      .number({
        message: 'Invalid offset parameter. Must be a number.',
      })
      .int({ message: 'Offset must be an integer.' })
      .min(0, { message: 'Offset must be 0 or greater.' })
  ),
  tab: z.string().refine((val) => val in faqCategory, {
    message: `Invalid tab parameter. Allowed values are: ${Object.keys(faqCategory).join(', ')}`,
  }),
  faqCategoryID: z.string().optional(),
  question: z.string().optional(),
});

export const handlers = [
  // 카테고리 리스트 API
  http.get('/api/faq/category', ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get('tab');

    if (!tab || !(tab in faqCategory)) {
      return createErrorResponse(
        `Invalid tab parameter: '${tab}'. Allowed values are: ${Object.keys(faqCategory).join(', ')}`
      );
    }

    const categoryList = faqCategory[tab as FAQ_CATEGORY_KEY];
    return HttpResponse.json(categoryList);
  }),

  http.get('/api/faq', ({ request }) => {
    const url = new URL(request.url);
    const faqQueryParams = Object.fromEntries(url.searchParams.entries());

    const parsedFaqQueryParams = faqQuerySchema.safeParse(faqQueryParams);
    if (!parsedFaqQueryParams.success) {
      const errorMessages = Object.values(parsedFaqQueryParams.error.format())
        .flatMap((error) => (error as { _errors: string[] })._errors || [])
        .filter(Boolean);

      return createErrorResponse(errorMessages[0]);
    }

    const { limit, offset, tab, faqCategoryID, question } = parsedFaqQueryParams.data;

    const filteredFaqData = faq[tab as FAQ_CATEGORY_KEY]
      .filter((data) => !faqCategoryID || data.categoryName === categoryIdToName(faqCategoryID))
      .filter((data) =>
        !question
          ? true
          : Object.values(data).some(
              (value) => typeof value === 'string' && value.includes(question)
            )
      );

    const withOffsetFaqData = filteredFaqData.slice(offset, offset + limit);

    return HttpResponse.json({
      pageInfo: {
        limit,
        offset,
        nextOffset: getNextOffset(offset, limit, filteredFaqData.length),
        prevOffset: Math.max(0, offset - limit),
        totalRecord: filteredFaqData.length,
      },
      items: withOffsetFaqData,
    });
  }),
  // 이용 약관 API
  http.get('/api/terms', ({ request }) => {
    const url = new URL(request.url);
    const termsClassID = url.searchParams.get('termsClassID');

    if (!termsClassID || !(termsClassID in terms)) {
      return createErrorResponse(
        `Invalid termsClassID parameter: '${termsClassID}'. Allowed values are: ${Object.keys(terms).join(', ')}`
      );
    }

    const termsData = terms[termsClassID as TERMS_KEY];

    return HttpResponse.json(termsData);
  }),
];

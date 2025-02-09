const FAQPage = async () => {
  const data = await fetch('http://localhost:3000/user');
  const res = await data.json();
  console.log(res);
  return (
    <>
      <h1>FAQPAGE</h1>
    </>
  );
};

export default FAQPage;

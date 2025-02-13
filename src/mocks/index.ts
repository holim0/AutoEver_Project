export async function initMsw() {
  if (typeof window === 'undefined') {
    const { server } = await import('../mocks/server');
    console.log('🌌 Server mock initialized');
    server.listen();
  } else {
    const { worker } = await import('../mocks/browser');
    console.log('🌌 Browser mock initialized');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

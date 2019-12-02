export default (miliSeconds: number): Promise<void> =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, miliSeconds * 1000),
  );

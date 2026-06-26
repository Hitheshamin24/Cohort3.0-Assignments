let count = 0;

async function fakeAPI() {
  count++;
  if (count < 3) {
    throw new Error("Api fetching failed");
  }
  return "Data Received";
}

async function retry(fn, attempts) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      console.log("Failed Attempt ", i);
      if (i == attempts) throw err;
    }
  }
}

// retry(fakeAPI, 5)
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err.message));

async function run() {
  try {
    const result = await retry(fakeAPI, 3);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

run()
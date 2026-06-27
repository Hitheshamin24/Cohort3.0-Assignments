function createTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      console.log("started Task ", id);
      setTimeout(() => {
        console.log("Finished Task ", id);
        resolve();
      }, delay);
    });
}

const run = async (tasks, limit) => {
  let index = 0;
  const worker = async () => {
    while (index < tasks.length) {
      const current = index;
      index++;
      await tasks[current]();
    }
  };
  const workers = [];
  for (let i = 0; i < limit; i++) {
    workers.push(worker());
  }
  await Promise.all(workers);
  console.log("All task cmplleted");
};

const tasks = [
  createTask(1, 2000),
  createTask(2, 2000),
  createTask(3, 2000),
  createTask(4, 2000),
  createTask(5, 2000),
];
run(tasks, 2);

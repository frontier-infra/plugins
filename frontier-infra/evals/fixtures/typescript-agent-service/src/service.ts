export interface ExistingQueue {
  claim(): Promise<{ id: string; prompt: string } | null>;
  acknowledge(id: string): Promise<void>;
}

export interface ExistingDatabase {
  recordResult(id: string, result: string): Promise<void>;
}

export interface ExistingWorker {
  run(prompt: string): Promise<string>;
}

export async function processNext(
  queue: ExistingQueue,
  database: ExistingDatabase,
  worker: ExistingWorker,
): Promise<boolean> {
  const job = await queue.claim();
  if (!job) return false;

  const result = await worker.run(job.prompt);
  await database.recordResult(job.id, result);
  await queue.acknowledge(job.id);
  return true;
}

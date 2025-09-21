export class CouldNotRetrieveUrlError extends Error {
  constructor() {
    super('Could not retrieve remote url.')
  }
}

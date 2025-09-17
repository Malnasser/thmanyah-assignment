export default function serializeForDynamo(obj: any): any {
  if (obj === null) return null;
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map((v) => this.serializeForDynamo(v));
  if (typeof obj === 'object') {
    const plain = obj.constructor === Object ? obj : { ...obj };
    return Object.fromEntries(
      Object.entries(plain)
        .filter(([_, v]) => {
          console.log(_);
          return v !== undefined;
        })
        .map(([k, v]) => [k, this.serializeForDynamo(v)]),
    );
  }
  if (['string', 'number', 'boolean'].includes(typeof obj)) return obj;

  throw new Error(`Unsupported DynamoDB attribute type: ${typeof obj}`);
}

const getGraphqlError = (error: any) => (
  error.message.includes('GraphQL error')
    ? error.message.split(':')[1].trim()
    : 'Something went wrong.');


export default getGraphqlError;

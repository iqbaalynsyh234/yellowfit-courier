export async function proxyExternalApi({
  url,
  method = 'GET',
  headers = {},
  body,
}: {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}) {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Accept': 'application/json',
      ...headers,
    },
  };
  if (body) {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
    };
  }
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  return { response, data };
} 
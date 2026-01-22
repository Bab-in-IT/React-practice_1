// Функция  валидации запросов - для вывода ошибки если пас не верный

export async function validateResponse(
  response: Response
): Promise<Response> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}:${errorText}`);
  }
  return response;
}

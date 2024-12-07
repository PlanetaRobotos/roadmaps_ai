async function handleApiCall(
  apiCall: () => Promise<any>,
  onSuccess?: (data: any) => void
) {
  try {
    const data = await apiCall();
    if (onSuccess) onSuccess(data);
  } catch (error) {
    console.error('API call failed:', error);
  }
}

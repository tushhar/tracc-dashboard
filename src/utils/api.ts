interface ApiSettings {
  baseUrl: string;
  username: string;
  password: string;
  endpoints: {
    workBundles: string;
    areas: string;
    assessments: string;
    areaCategories: string;
  };
}

export async function fetchWithAuth(endpoint: keyof ApiSettings['endpoints'], params: Record<string, string> = {}) {
  const settingsString = localStorage.getItem('apiSettings');
  if (!settingsString) {
    throw new Error('API settings not found');
  }

  const settings: ApiSettings = JSON.parse(settingsString);
  const url = new URL(settings.endpoints[endpoint], settings.baseUrl);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': 'Basic ' + btoa(`${settings.username}:${settings.password}`),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
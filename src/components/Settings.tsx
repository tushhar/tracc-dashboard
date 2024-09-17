import React, { useState, useEffect } from 'react';
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"

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

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<ApiSettings>({
    baseUrl: '',
    username: '',
    password: '',
    endpoints: {
      workBundles: '',
      areas: '',
      assessments: '',
      areaCategories: '',
    },
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('apiSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('apiSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in settings.endpoints) {
      setSettings(prev => ({
        ...prev,
        endpoints: { ...prev.endpoints, [name]: value },
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your API details here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                name="baseUrl"
                placeholder="Enter base URL"
                value={settings.baseUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter username"
                value={settings.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={settings.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="workBundles">Work Bundles Endpoint</Label>
              <Input
                id="workBundles"
                name="workBundles"
                placeholder="Enter Work Bundles endpoint"
                value={settings.endpoints.workBundles}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="areas">Areas Endpoint</Label>
              <Input
                id="areas"
                name="areas"
                placeholder="Enter Areas endpoint"
                value={settings.endpoints.areas}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="assessments">Assessments Endpoint</Label>
              <Input
                id="assessments"
                name="assessments"
                placeholder="Enter Assessments endpoint"
                value={settings.endpoints.assessments}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="areaCategories">Area Categories Endpoint</Label>
              <Input
                id="areaCategories"
                name="areaCategories"
                placeholder="Enter Area Categories endpoint"
                value={settings.endpoints.areaCategories}
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
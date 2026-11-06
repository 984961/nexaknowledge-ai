import React, { useState } from 'react';
import { NavigationModule } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { AIAssistant } from './components/ai/AIAssistant';
import { DashboardPage } from './pages/DashboardPage';
import { CompanyPoliciesPage } from './pages/CompanyPoliciesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AssistantPage } from './pages/AssistantPage';

export function App() {
  const [currentModule, setCurrentModule] = useState<NavigationModule>('dashboard');
  const [activeWorkspace, setActiveWorkspace] = useState('My Business (Global HQ)');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRightAssistantOpen, setIsRightAssistantOpen] = useState(true);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | undefined>(undefined);
  const [selectedPolicyFilter, setSelectedPolicyFilter] = useState<string | null>(null);

  const handleAskAI = (query: string) => {
    setAssistantInitialQuery(query);
    if (!isRightAssistantOpen) {
      setIsRightAssistantOpen(true);
    }
  };

  const handleNavigateToPolicy = (policyName: string) => {
    setSelectedPolicyFilter(policyName.replace('.pdf', '').replace('.docx', ''));
    setCurrentModule('policies');
  };

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={(mod) => setCurrentModule(mod)}
            onAskAI={handleAskAI}
            isEditMode={isEditMode}
          />
        );
      case 'policies':
        return (
          <CompanyPoliciesPage
            onAskAI={handleAskAI}
            selectedPolicyFilter={selectedPolicyFilter}
          />
        );
      case 'documents':
        return <DocumentsPage onAskAI={handleAskAI} />;
      case 'analytics':
        return <AnalyticsPage onAskAI={handleAskAI} />;
      case 'datasources':
        return <DataSourcesPage onAskAI={handleAskAI} />;
      case 'reports':
        return <ReportsPage onAskAI={handleAskAI} />;
      case 'settings':
        return <SettingsPage />;
      case 'assistant':
        return (
          <AssistantPage
            onAskAI={handleAskAI}
            onOpenRightAssistant={() => setIsRightAssistantOpen(true)}
          />
        );
      default:
        return (
          <DashboardPage
            onNavigate={(mod) => setCurrentModule(mod)}
            onAskAI={handleAskAI}
            isEditMode={isEditMode}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080B18] text-[#F8FAFC]">
      {/* 1. Left Navigation Sidebar (240px) */}
      <Sidebar
        currentModule={currentModule}
        onSelectModule={(mod) => {
          setSelectedPolicyFilter(null);
          setCurrentModule(mod);
        }}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />

      {/* 2. Central Main Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Top Navigation Bar (~70px) */}
        <Topbar
          currentModule={currentModule}
          activeWorkspace={activeWorkspace}
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode(!isEditMode)}
          onOpenAssistant={() => setIsRightAssistantOpen(true)}
          onGlobalSearchSelect={(query) => handleAskAI(query)}
        />

        {/* Scrollable Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#080B18]">
          {renderCurrentModule()}
        </main>
      </div>

      {/* 3. Permanent Right-Side AI Assistant (360px-380px) */}
      <AIAssistant
        isOpen={isRightAssistantOpen}
        onToggle={() => setIsRightAssistantOpen(!isRightAssistantOpen)}
        onNavigateToPolicy={handleNavigateToPolicy}
        initialQuery={assistantInitialQuery}
        onClearInitialQuery={() => setAssistantInitialQuery(undefined)}
      />
    </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { DocsLayout } from "@/components/layout/DocsLayout";
import { HomePage } from "@/pages/HomePage";
import { ColorsPage } from "@/pages/ColorsPage";
import { TypographyPage } from "@/pages/TypographyPage";
import { SpacingPage } from "@/pages/SpacingPage";
import { RadiiPage } from "@/pages/RadiiPage";
import { ShadowsPage } from "@/pages/ShadowsPage";
import { IconographyPage } from "@/pages/IconographyPage";
import { ButtonPage } from "@/pages/components/ButtonPage";
import { BadgePage } from "@/pages/components/BadgePage";
import { InputPage } from "@/pages/components/InputPage";
import { CardPage } from "@/pages/components/CardPage";
import { TablePage } from "@/pages/components/TablePage";
import { TabsPage } from "@/pages/components/TabsPage";
import { SegmentedControlPage } from "@/pages/components/SegmentedControlPage";
import { FilterBarPage } from "@/pages/patterns/FilterBarPage";
import { Placeholder } from "@/pages/Placeholder";

function App() {
  return (
    <DocsLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/spacing" element={<SpacingPage />} />
        <Route path="/radii" element={<RadiiPage />} />
        <Route path="/shadows" element={<ShadowsPage />} />
        <Route path="/iconography" element={<IconographyPage />} />
        <Route path="/levels" element={<Navigate to="/colors" replace />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/card" element={<CardPage />} />
        <Route path="/components/table" element={<TablePage />} />
        <Route path="/components/tabs" element={<TabsPage />} />
        <Route path="/components/segmented-control" element={<SegmentedControlPage />} />
        <Route path="/patterns/filter-bar" element={<FilterBarPage />} />
        <Route path="*" element={<Placeholder eyebrow="404" title="Not found" />} />
      </Routes>
    </DocsLayout>
  );
}

export default App;

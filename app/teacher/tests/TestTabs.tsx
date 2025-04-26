
import { Tabs } from "antd";

interface TestTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TestTabs({ activeTab, setActiveTab }: TestTabsProps) {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      className="min-w-[260px]"
      tabBarGutter={16}
    >
      <Tabs.TabPane tab="Tất cả" key="all" />
      <Tabs.TabPane tab="Công khai" key="publish" />
      <Tabs.TabPane tab="Riêng tư" key="private" />
    </Tabs>
  );
} 
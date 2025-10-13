import { Descriptions, theme } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';

const { compactAlgorithm, defaultAlgorithm } = theme;

const BasicTheme = {
  algorithm: defaultAlgorithm,
  token: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    colorPrimary: '#FF6D8D',          // Main primary color (pink)
    colorPrimaryHover: '#FF8099',    // Slightly lighter pink for hover
    colorPrimaryActive: '#E65D7F',   // Slightly darker pink for active states
    colorSiderTrigger: '#FF6D8D',    // Trigger background color (pink)
    colorSiderTriggerText: '#ffffff', // Trigger text color (white)
    colorSiderBg: '#FF6D8D',         // Sidebar background color (pink)
    colorBgBase: '#fff5f8',          // Base background color (light pink/white)

    // Typography
    colorText: '#333333',              // Default text
    colorTextHeading: '#FF6D8D',       // Headings (h1–h6) in pink
    colorTextSecondary: '#666666',     // Secondary text
    colorTextTertiary: '#999999',      // Tertiary text
    colorTextQuaternary: '#cccccc',    // Disabled / hint text
    borderRadius: 4,                   // Border radius for elements

    // Component-specific styles
    Select: {
      colorTextDisabled: '#000000', 
      colorBgContainerDisabled: '#f0f0f0', // Background for disabled input
    },
    Input: {
      colorTextDisabled: '#000000', 
      colorBgContainerDisabled: '#f0f0f0', // Background for disabled input
    },
    InputNumber: {
      colorTextDisabled: '#000000', 
      colorBgContainerDisabled: '#f0f0f0', // Background for disabled input
    },
    Table: {
      headerColor: '#333333',              // Table header text
      colorBgContainer: '#ffffff',         // Table background
      colorBorderSecondary: '#e0e0e0',     // Light border
      colorFillAlter: '#fff5f8',           // Alt row background (light pink)
      rowSelectedBg: '#fff0f3',            // Selected row background (lighter pink)
      rowSelectedHoverBg: '#ffe4eb'        // Hovered selected row background (very light pink)
    },
    Tabs: {
      // Add custom styling for Tabs if needed
    },
    Descriptions: {
      titleColor: '#FF6D8D',               // Descriptions title in pink
      labelColor: '#FF6D8D'                // Descriptions label in pink
    },
  },
};

export default BasicTheme;
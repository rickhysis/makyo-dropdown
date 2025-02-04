import { Meta, StoryFn } from "@storybook/react";
import SearchableDropdown from "./SearchableDropdown";

export default {
    title: "Components/SearchableDropdown",
    component: SearchableDropdown,
    argTypes: {
        id: { control: 'text' },
        withSearch: { control: 'boolean' },
        multiple: { control: 'boolean' },
        optionLabel: { control: 'text' },
        outlined: { control: 'boolean' },
    },
} as Meta<typeof SearchableDropdown>;

const options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option with icon" },
    { value: "Option 3", label: "Long Long Option" },
    { value: "Option 4", label: "Long Long Long Option 4" },
    { value: "Option 5", label: "Long Long Long Long Option 5" },
    { value: "Option 6", label: "Long Long Long Long Long Option 6" }
];

const Template: StoryFn<typeof SearchableDropdown> = (args) => {
    return (
        <div className="flex items-center gap-2">
            <label className="min-w-32">Label</label>
            <SearchableDropdown {...args} options={options} onChange={() => {}} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    id: 'sdd-1',
    multiple: false,
    withSearch: true,
    outlined: false,
    options: options
};

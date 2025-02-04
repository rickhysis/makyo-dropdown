import SearchableDropdown from './components/SearchableDropdown';
import './App.css';

const options = [
  { value: "Option 1", label: "Option 1" },
  { value: "Option 2", label: "Option with icon" },
  { value: "Option 3", label: "Long Long Option" },
  { value: "Option 4", label: "Long Long Long Option 4" },
  { value: "Option 5", label: "Long Long Long Long Option 5" },
  { value: "Option 6", label: "Long Long Long Long Long Option 6" }
];

function App() {
  return (
    <div className="App">
      <div className="flex items-center gap-2 p-4">
        <label className="min-w-32">Label</label>
        <SearchableDropdown multiple={false} withSearch={true} options={options} onChange={() => {}} />
      </div>
    </div>
  );
}

export default App;

// Dropdown for selecting task categories

interface Props {
    categories: { id: number; name: string }[]; // List of category options
    selectedId: number | null; // Currently selected category
    onChange: (id: number) => void; // Handler for select change
  }
  
  const CategorySelect = ({ categories, selectedId, onChange }: Props) => {
    return (
      <select value={selectedId ?? ''} onChange={(e) => onChange(Number(e.target.value))}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option> // Render options
        ))}
      </select>
    );
  };
  
  export default CategorySelect;


export default function ChoiceInput({ label, name,value, options }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <select
                name={name}
                id={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
                {options.map((id,option) => (
                    <option key={option} value={value[id]}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
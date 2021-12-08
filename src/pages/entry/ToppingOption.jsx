export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleToggleCheck = (e) => {
    const { checked } = e.target;
    const newItemCount = checked ? 1 : 0;
    updateItemCount({ itemName: name, newItemCount });
  };
  return (
    <div className="option-container">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <label htmlFor={`${name}Topping`}>{name}</label>
      <input
        name={name}
        onClick={handleToggleCheck}
        type="checkbox"
        id={`${name}Topping`}
        aria-label={name}
      />
    </div>
  );
}

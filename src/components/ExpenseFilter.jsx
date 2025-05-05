import styles from './ExpenseFilter.module.css';
import filterIcon from '../assets/images/filterIcon.svg';

export function ExpenseFilter({ filters, onFilter }) {
  const months = [
    { value: '', label: 'ALL' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from(
    { length: 5 },
    (_, index) => new Date().getFullYear() - index
  );

  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Grocery',
    'Utilities',
    'Others'
  ];

  const handleCategoryChange = (category, isChecked) => {
    const updatedCategories = isChecked
      ? [...filters.category, category]
      : filters.category.filter((cat) => cat !== category);
      onFilter("category", updatedCategories);
  };

  const handleSelectAll = (isChecked) => {
    onFilter("category", isChecked ? [...categories] : []);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.FilterContainer}>
        <p className={styles.FilterHeader}>Filter By</p>
        <img src={filterIcon} alt="Filter Icon"/>
      </div>
      <label className={styles.FilterLabel}>Month:
        <select value={filters.month} onChange={(event) => onFilter('month', event.target.value)}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </label>
      <br/>
      <label className={styles.FilterLabel}>Year:
        <select value={filters.year} onChange={(event) => onFilter('year', event.target.value)}>
          <option value="">ALL</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <br/>
      {/* <label className={styles.FilterLabel}>Category: 
        <select value={filters.category} onChange={(event) => onFilter('category', event.target.value)}>
          <option value="">ALL</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label> */}
      <label className={styles.FilterLabel}>Category:</label>
      <div className={styles.CheckboxContainer}>
        <div class={styles.CheckboxWrapper}>
          <input type="checkbox" id="selectAll" checked={filters.category.length === categories.length}
            onChange={(event) => handleSelectAll(event.target.checked)}
          />
          <label htmlFor="selectAll">Select All</label>
        </div>
        {categories.map((category) => (
          <div key={category} className={styles.CheckboxWrapper}>
            <input
              type="checkbox"
              id={category}
              value={category}
              checked={filters.category.includes(category)}
              onChange={(event) => handleCategoryChange(category, event.target.checked)}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
    </div>

    </div>
  );
}

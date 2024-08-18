import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CategoryDropdown = ({ categories, onSelect,categoryId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    onSelect(category); // Gọi hàm callback để xử lý khi người dùng chọn category
  };
  useEffect(() => {
   
    if(categoryId){
       
        const cate=(categories.find(x => x.id === categoryId))
        console.log(cate)
        //onSelect(cate)
        setSelectedCategory(cate);
    }
    else{
        if (categories && categories.length > 0) {
            setSelectedCategory(categories[0]);
            onSelect(categories[0]); // Gọi onSelect với category đầu tiên
          }
    }
  }, [categories]);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {selectedCategory ? selectedCategory.name : 'Select a category'}
      </DropdownToggle>
      <DropdownMenu>
        {categories&&categories.map((category) => (
          <DropdownItem key={category.id} onClick={() => handleSelect(category)}>
            {category.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CategoryDropdown;

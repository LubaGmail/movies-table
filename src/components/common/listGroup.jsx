import React from 'react'

const ListGroup = (props) => {
    const {items, valueProp, textProp, onItemSelect, selectedItem} = props;
  
    return ( 
        <ul className='list-group'>
            {items.map( item => 
                <li onClick = { () => onItemSelect(item)}
                    key={item[valueProp]} 
                    className={ selectedItem === item ? 'list-group-item active' : 'list-group-item'}
                >
                    {item[textProp]}
                </li>
            )}
        </ul>
     );
}

ListGroup.defaultProps = {
    valueProp: '_id',
    textProp: 'name'
}
 
export default ListGroup;
import { Input } from 'antd';
import { useContext } from 'react';
import { DataContext } from '../../context/dataContext';

const SearchBox = () => {

    const {setQuery} = useContext(DataContext)

    const onChange = (e) => {
        //console.log(e.target.value);
        setQuery(e.target.value)
      };

    return  <Input className='sticky top-0 m-2 bg-gray-200 active:bg-gray-200 hover:bg-gray-200 focus:bg-gray-200 relative inset-y-0 right-0  rounded-full w-64' 
    placeholder="type to search user by name" 
    allowClear 
    onChange={(e)=>onChange(e)} /> 
}

export default SearchBox
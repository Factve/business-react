import { useEffect, useState } from 'react';
import classes from './foodsUserPage.module.css';
import { Link, useParams } from 'react-router-dom';
import {getAll, search } from '../../services/foodService';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';

export default function FoodsUserPage() {
  const [foods, setFoods] = useState();
  const { searchTerm } = useParams();

  useEffect(() => {
    loadFoods();
  }, [searchTerm]);

  const loadFoods = async () => {
    const foods = searchTerm ? await search(searchTerm) : await getAll();
    setFoods(foods);
  };

  const FoodsNotFound = () => {
    if (foods && foods.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/foods" linkText="Show All" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    );
  };


  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Businesses" margin="1rem auto" />
        <Search
          searchRoute="/foods/"
          defaultRoute="/foods"
          margin="1rem 0"
          placeholder="Search"
        />
        <Link to="/addFood" className={classes.add_food}>
          Add +
        </Link>
        <FoodsNotFound />
        {foods &&
          foods.map(food => (
            <div key={food.id} className={classes.list_item}>
              <img src={food.imageUrl} alt={food.name} />
              <Link to={'/food/' + food.id}>{food.name}</Link>
              <Price price={food.price} />
            </div>
          ))}
      </div>
    </div>
  );
}
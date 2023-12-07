import React, { useEffect, useMemo, useState } from "react";
import { itemsServices } from "../../services";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination.component";
import Spinner from "../../ui/spinner/Spinner.component";
import ItemCard from "./ItemCard.component";
import Header from "../../ui/Header/Header.component";

const ItemList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [search, setSearch] = useState("");

  console.log(items.length);
  // handle pagination logics
  const { page } = useParams();
  const PAGE_SIZE = 50;
  const startIndex = parseInt(page) * PAGE_SIZE;
  const lastIndex = (parseInt(page) + 1) * PAGE_SIZE;

  const filteredItems = useMemo(() => {
    let filteredItemsArray = [...items];
    if (search?.length > 0) {
      filteredItemsArray = items?.filter((item) => {
        return item.schemeName.toLowerCase()?.includes(search?.toLowerCase());
      });
    }
    return filteredItemsArray?.slice(startIndex, lastIndex);
  }, [startIndex, lastIndex, items, search]);

  // get items works for get all mutual fund list

  const getItems = async () => {
    try {
      await setIsLoading(true);
      const response = await itemsServices.getItems();
      if (response.length) {
        setItems(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleItemClick = (code) => {
    navigate(`/item/${code}`);
  };

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    navigate(`/items/${page}`);
  };

  const handleFilter = (e) => {
    navigate(`/items/${0}`);
    setSearch(e.target.value);
  };

  return !isLoading ? (
    <div className="container">
      <Header />
      <div className="row header">
        <div className="col-md-12">
          <h3 className="heading">COMPLETE MUTUAL FUND LIST</h3>
        </div>

        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search for your favourite mutual fund..."
            value={search}
            onChange={handleFilter}
          />
        </div>
        <div className="col-md-4"></div>
      </div>

      {filteredItems?.length ? (
        filteredItems.map((item) => (
          <ItemCard
            key={item.schemeName}
            item={item}
            handleClick={handleItemClick}
          />
        ))
      ) : (
        <h5>No item found!</h5>
      )}
      <Pagination
        pageHandler={handlePage}
        pageSize={PAGE_SIZE}
        count={items?.length}
      />
    </div>
  ) : (
    <Spinner />
  );
};

export default ItemList;

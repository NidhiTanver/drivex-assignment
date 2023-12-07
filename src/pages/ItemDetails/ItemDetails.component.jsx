import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { itemsServices } from "../../services";
import "./styles.scss";
import Spinner from "../../ui/spinner/Spinner.component";
import Header from "../../ui/Header/Header.component";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ItemDetails = () => {
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const getItemById = useCallback(async () => {
    try {
      await setIsLoading(true);
      const response = await itemsServices.getItemById(id);
      if (response) {
        setItemDetails(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getItemById();
  }, [getItemById]);

  const data = itemDetails?.data.slice(
    itemDetails?.data.length - 7,
    itemDetails?.data.length
  );

  return !isLoading ? (
    <div className="container">
      <Header />
      <div className="form-group button">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/items/${0}`)}
        >
          Back
        </button>
      </div>
      <div className="card text-left~">
        <div className="card-header">{itemDetails?.meta.fund_house}</div>
        <div className="card-body">
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="nav" stroke="#8884d8" />
          </LineChart>
          <h5 className="card-title">{itemDetails?.meta.scheme_name}</h5>
          <p className="card-text">{itemDetails?.meta.scheme_type}</p>
        </div>
        <div className="card-footer text-muted">
          {itemDetails.meta.scheme_category}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default ItemDetails;

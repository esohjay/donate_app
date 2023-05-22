import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddItemMutation } from "../../api/items";
import { useGetSingleUserQuery } from "../../api/auth";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type Inputs = {
  description: string;
  category: string;
  quantity: number;
  name: string;
  transaction_type: string;
};

function AddItem() {
  const [addItem] = useAddItemMutation();
  const { uid } = useParams();
  const { user } = useAuth();
  const { currentData } = useGetSingleUserQuery(`${uid}`);
  console.log(currentData);
  console.log(user);
  const {
    register,
    handleSubmit: handleSubmitForm1,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    addItem({
      ...data,
      cordinates: `POINT(${currentData?.geometry?.coordinates[0]} ${currentData?.geometry?.coordinates[1]})`,
      user: currentData?.id,
    });
  };
  return (
    <article className="bg-white p-5 rounded-md ">
      <h3 className="text-center text-mainColor uppercase text-2xl font-semibold md:text-4xl mb-5">
        Add item
      </h3>

      <form onSubmit={handleSubmitForm1(onSubmitForm)}>
        <div className="mb-5 ">
          <label
            htmlFor="Name"
            className="block text-mainColor font-semibold mb-3"
          >
            Name
          </label>
          <input
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">name is required</span>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="category"
            className="block text-mainColor font-semibold mb-3"
          >
            Category
          </label>
          <select
            {...register("category")}
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
            focus:border-mainColor focus:border-2"
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
            <option value="others">Others</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category?.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="transaction_type"
            className="block text-mainColor font-semibold mb-3"
          >
            Listing type
          </label>
          <select
            {...register("transaction_type")}
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
            focus:border-mainColor focus:border-2"
          >
            <option value="">Select type</option>
            <option value="Offer">Give away</option>
            <option value="Request">Request</option>
          </select>
          {errors.transaction_type && (
            <span className="text-red-500">
              {errors.transaction_type?.message}
            </span>
          )}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="quantity"
            className="block text-mainColor font-semibold mb-3"
          >
            Quantity
          </label>
          <input
            type="number"
            min={1}
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("quantity", {
              required: true,
            })}
          />
          {errors.quantity && <span>quantity is required</span>}
        </div>
        <div className="mb-5 ">
          <label
            htmlFor="quantity"
            className="block text-mainColor font-semibold mb-3"
          >
            Description
          </label>
          <textarea
            rows={5}
            className="block p-2 border rounded-md w-full focus:outline-none text-mainColor text-base
                focus:border-mainColor focus:border-2"
            {...register("description", {
              required: true,
            })}
          />
          {errors.quantity && <span>quantity is required</span>}
        </div>
        <button className="inline-block bg-mainColor capitalize text-white rounded-md py-1 px-4  font-medium">
          submit
        </button>
      </form>
    </article>
  );
}

export default AddItem;

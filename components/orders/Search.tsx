import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  orderId: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col mt-4 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4 p-4 border-yellow-500 border-2 rounded-lg w-1/2"
      >
        <input
          type="text"
          className="flex-1"
          placeholder="Order ID"
          {...register("orderId", {
            required: true,
          })}
        />
        <button
          type="submit"
          className="text-black font-semibold bg-yellow-500 p-4"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Search;

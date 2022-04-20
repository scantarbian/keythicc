import { Product } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";
import { Image as Img } from "models/Image";
import { NextRouter } from "next/router";
// components
import Select from "react-select";
// hooks
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  product: Product & { _id: string; image: [Img & { _id: string }] };
  types: [Type & { _id: string }];
  categories: [Category & { _id: string }];
  setEditMode: (editMode: boolean) => void;
  router: NextRouter;
};

type Inputs = {
  name: string;
  description: string;
  basePrice: number;
  stock: number;
  footnotes: string;
  type: {
    value: string;
    label: string;
  };
  category: {
    value: string;
    label: string;
  };
};

const ProductEditMode = ({
  product,
  types,
  categories,
  setEditMode,
  router,
}: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: product.name,
      description: product.description,
      basePrice: product.basePrice,
      stock: product.stock,
      footnotes: product.footnote,
      type: {
        value: String(product.type),
        label: types.find((type) => type._id === String(product.type))?.name,
      },
      category: {
        value: String(product.category),
        label: categories.find(
          (category) => category._id === String(product.category)
        )?.name,
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/product", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product._id,
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        stock: data.stock,
        footnotes: data.footnotes,
        type: data.type?.value,
        category: data.category?.value,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setEditMode(false);
        router.reload();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-4 gap-4 text-black items-center"
    >
      <span className="text-right text-white">Name</span>
      <input
        type="text"
        className="col-span-3"
        {...register("name")}
        placeholder="Product name"
      />
      <span className="text-right text-white">Type</span>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={types.map((type) => ({
              value: type._id,
              label: type.name,
            }))}
            placeholder="Select Type"
            className="w-full col-span-3"
          />
        )}
      />
      <span className="text-right text-white">Shelf Category</span>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
            placeholder="Select Category"
            className="w-full col-span-3"
          />
        )}
      />
      <span className="text-right text-white">Description</span>
      <textarea
        className="w-full resize-none h-28 col-span-3"
        {...register("description")}
        placeholder="Product description"
      />
      <span className="text-right text-white">Price</span>
      <input
        type="number"
        className="w-full col-span-3"
        {...register("basePrice")}
        placeholder="Product price"
      />
      <span className="text-right text-white">Stock</span>
      <input
        type="number"
        className="w-full col-span-3"
        {...register("stock")}
        placeholder="Product stock"
      />
      <span className="text-right text-white">Footnotes</span>
      <input
        type="text"
        className="w-full col-span-3"
        {...register("footnotes")}
        placeholder="Footnotes"
      />
      <button
        type="submit"
        className="px-4 py-2 mb-4 border-b-2 col-start-4 border-white hover:border-orange-400 hover:text-orange-400 text-white"
      >
        Update
      </button>
    </form>
  );
};

export default ProductEditMode;

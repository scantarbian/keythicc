import { Product, KeycapMaterial, SwitchType } from "models/Product";
import { Type } from "models/Type";
import { Category } from "models/Category";
import { Image as Img } from "models/Image";
import { NextRouter } from "next/router";
// components
import Select from "react-select";
import { MultiTextInput } from "./CustomFields";
// hooks
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  product: Product & {
    _id: string;
    image: [Img & { _id: string }];
    type: Type & {
      _id: string;
    };
    baseKeycaps?: Product & { _id: string };
    baseSwitches?: Product & { _id: string };
  };
  types: [Type & { _id: string }];
  categories: [Category & { _id: string }];
  setEditMode: (editMode: boolean) => void;
  router: NextRouter;
  baseKeycaps?: Array<Product & { _id: string }>;
  baseSwitches?: Array<Product & { _id: string }>;
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
  keythiccPoints: number;
  manufacturer: string;
  display: boolean;
  customizable?: boolean;
  baseKeycaps?: {
    value: string;
    label: string;
  };
  baseSwitches?: {
    value: string;
    label: string;
  };
  wireless?: boolean;
  sizes?: Array<string>;
  colors?: {
    value: string;
    label: string;
  };
  cases?: Array<string>;
  material?: KeycapMaterial;
  switchType?: SwitchType;
  optical?: boolean;
  actuationDistance?: number;
  actuationForce?: number;
};

const ProductEditMode = ({
  product,
  types,
  categories,
  setEditMode,
  router,
  baseKeycaps,
  baseSwitches,
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
      keythiccPoints: product.keythiccPoints,
      manufacturer: product.manufacturer,
      type: {
        value: product.type._id,
        label: product.type.name,
      },
      category: {
        value: String(product.category),
        label: categories.find(
          (category) => category._id === String(product.category)
        )?.name,
      },
      display: product.display,
      customizable: product.customizable,
      baseKeycaps: {
        value: product.baseKeycaps?._id,
        label: product.baseKeycaps?.name,
      },
      baseSwitches: {
        value: product.baseSwitches?._id,
        label: product.baseSwitches?.name,
      },
      wireless: product.wireless,
      sizes: product.sizes,
      cases: product.cases,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // fetch("/api/product", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: product._id,
    //     name: data.name,
    //     description: data.description,
    //     basePrice: data.basePrice,
    //     stock: data.stock,
    //     keythiccPoints: data.keythiccPoints,
    //     manufacturer: data.manufacturer,
    //     footnotes: data.footnotes,
    //     display: data.display,
    //     type: data.type?.value,
    //     category: data.category?.value,
    //     baseKeycaps: data.baseKeycaps?.value,
    //     baseSwitches: data.baseSwitches?.value,
    //     customizable: data.customizable,
    //   }),
    // }).then((res) => {
    //   if (res.status === 200) {
    //     setEditMode(false);
    //     router.reload();
    //   }
    // });
  };

  // switch based on types
  const typeRelativeFields = () => {
    switch (product.type.name.toLowerCase()) {
      case "keyboard":
        return (
          <>
            <span className="text-right text-white">Customizable</span>
            <input
              type="checkbox"
              className="col-span-3"
              {...register("customizable")}
            />
            <span className="text-right text-white">Wireless</span>
            <input
              type="checkbox"
              className="col-span-3"
              {...register("wireless")}
            />
            {baseKeycaps && baseSwitches && (
              <>
                <span className="text-right text-white">Base Keycaps</span>
                <Controller
                  name="baseKeycaps"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={baseKeycaps.map((keycap) => ({
                        value: keycap._id,
                        label: keycap.name,
                      }))}
                      placeholder="Select Base Keycap"
                      className="w-full col-span-3"
                    />
                  )}
                />
                <span className="text-right text-white">Base Switches</span>
                <Controller
                  name="baseSwitches"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={baseSwitches.map((switches) => ({
                        value: switches._id,
                        label: switches.name,
                      }))}
                      placeholder="Select Base Switch"
                      className="w-full col-span-3"
                    />
                  )}
                />
                <span className="text-right text-white">Available Sizes</span>
                <Controller
                  name="sizes"
                  control={control}
                  render={({ field }) => (
                    <MultiTextInput
                      {...field}
                      className="w-full col-span-3"
                      placeholder="Insert Sizes (separate with comma)"
                    />
                  )}
                />
                <span className="text-right text-white">
                  Available Materials (Cases)
                </span>
                <Controller
                  name="cases"
                  control={control}
                  render={({ field }) => (
                    <MultiTextInput
                      {...field}
                      className="w-full col-span-3"
                      placeholder="Insert Case Materials (separate with comma)"
                    />
                  )}
                />
                <span className="text-right text-white">Available Colors</span>
              </>
            )}
          </>
        );
      default:
        return <></>;
    }
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
      <span className="text-right text-white">KeyThicc Points</span>
      <input
        type="number"
        className="w-full col-span-3"
        {...register("keythiccPoints")}
        placeholder="KeyThicc Points"
      />
      <span className="text-right text-white">Manufacturer</span>
      <input
        type="text"
        className="col-span-3"
        {...register("manufacturer")}
        placeholder="Product manufacturer"
      />
      <span className="text-right text-white">Footnotes</span>
      <input
        type="text"
        className="w-full col-span-3"
        {...register("footnotes")}
        placeholder="Footnotes"
      />
      <span className="text-right text-white">Display</span>
      <input type="checkbox" className="col-span-3" {...register("display")} />
      {typeRelativeFields()}
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

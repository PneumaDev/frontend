import React from "react";

export default function NewsletterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 font-imprima">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac
        congue libero, ut semper urna.
      </p>
      <form
        action=""
        className="w-full sm:w-1/2 flex items-center gap-3 my-6 mx-auto border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none border-none font-muktaVaani focus:border-none"
          type="email"
          name="email"
          id=""
          placeholder="Enter your email"
          required
        />
        <button
          onClick={onSubmitHandler}
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 font-muktaVaani"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import { rewrite } from "./services/ApiServices";
import ProcessOverlay from "./ProcessOverlay";

const Paraphrase = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(false);
  const [process, setProcess] = useState(false);
  const [apikey, setApikey] = useState("");
  const [message, setMessage] = useState("");

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleApiKey = (e: any) => {
    setApikey(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setProcess(true);
    rewrite(text, apikey)
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
        setNotif(true);
        setProcess(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.data.message);
        setLoading(false);
        setNotif(true);
        setProcess(false);
      });
  };

  return (
    <>
      {process && <ProcessOverlay />}
      <div
        className={
          "md:w-1/4 my-2 rounded-r-md px-6 border-l-4 -ml-4 border-gray-100 bg-green-500 " +
          (notif ? "fixed" : "hidden")
        }
      >
        <div className="flex items-center py-4">
          <i className="fas fa-check border-2 border-gray-200 px-2 rounded-full fill-current text-4xl font-light text-gray-200"></i>
          <div className="ml-5">
            <h1 className="text-lg font-bold text-gray-200">Notifikasi</h1>
            <p className="text-gray-300 my-0">{message}</p>
          </div>
          <div>
            <button
              type="button"
              className=" text-yellow-100"
              onClick={() => {
                setNotif(false);
              }}
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-blue-500 min-h-screen p-12">
        <div className="flex flex-col">
          <h1 className="text-white text-center text-2xl font-mono font-bold mb-8">
            Paraphrase tool using RapidApi - created by{" "}
            <a
              href="https://instagram.com/brilyyyyyyy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              brilyyy
            </a>
          </h1>
          <div className="flex justify-center">
            <input
              className="p-2 border rounded-lg focus:outline-none mb-6 w-2/4"
              placeholder="Masukkan rapid api key"
              onChange={handleApiKey}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h1 className="text-white font-mono">Maksimal 10.000 karakter</h1>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-6 text-justify"
                  rows={20}
                  maxLength={10000}
                  name="text"
                  placeholder="Masukkan teks yang akan di parafrase"
                  onChange={handleTextChange}
                ></textarea>
              </div>
              <div>
                <textarea
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none mb-6 bg-white text-justify"
                  rows={20}
                  maxLength={10000}
                  name="text"
                  placeholder="Hasil parafrase"
                  value={!loading && data.rewrite}
                  readOnly
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="bg-green-500 w-52 text-gray-100 rounded hover:bg-green-400 px-4 py-2 focus:outline-none"
              >
                Parafrase
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Paraphrase;

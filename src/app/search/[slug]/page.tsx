// "use client"
// import React, { useEffect, useState } from "react";

// interface CarsPageProps {
//   params: { slug: string }; // params is passed as a promise but destructured here for simplicity.
// }

// const SearchPage = ({ params }: CarsPageProps) => {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Destructure `slug` from params
//   const slug = params.slug;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/cars/${slug}`); // Fetch data from API
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
//         setData(result); // Set data in state
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false); // Set loading to false after data is fetched
//       }
//     };

//     fetchData();
//   }, [slug]); // Run effect whenever `slug` changes

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Show error if any occurs
//   }

//   if (!data || !data.cars || data.cars.length === 0) {
//     return <div>No cars found for the given search: {slug}</div>; // Handle no data scenario
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">
//         Search Results for: <span className="text-blue-500">{slug}</span>
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.cars.map((car: any) => (
//           <div
//             key={car.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             <h2 className="text-xl font-semibold">{car.name}</h2>
//             <p className="text-gray-600">{car.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

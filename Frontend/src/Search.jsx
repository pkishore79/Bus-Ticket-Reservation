// import React, { useState } from 'react'
// import SearchRes from './SearchRes'
// import './Search.css'
// import BackHome from './BackHome'

// function Search({ showBackHome = false }) {

//   let [state,setState]=useState([])
//   let [stage,setStage]=useState(false)


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     const source = formData.get("source");
//     const destination = formData.get("destination");
//     const travelDate = formData.get("td");

//     console.log(source, destination, travelDate);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/buses/search?source=" +
//           source +
//           "&destination=" +
//           destination +
//           "&seats=1",
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       setState(data)
//       setStage(true);

//     } catch (error) {
//       console.error("Error fetching buses:", error);
//     }
//   };

//   return (
//     <div>
//       {showBackHome && <BackHome></BackHome>}
//     <div className='search'>
//       <form onSubmit={handleSubmit}>
//         <section>
//           <label>From</label>
//           <input type="text" name="source" placeholder="📍 Source" required />
//         </section>

//         <section>
//           <label>To</label>
//           <input type="text" name="destination" placeholder="📍 Destination" required />
//         </section>

//         {/* <section>
//           <label>Travel Date</label>
//           <input type="date" name="td" required />
//         </section> */}

//         <section className='searchbut'>
//           <button type="submit">🔎 Search</button>
//         </section>
//       </form>
      
//     </div>
//       {
//         stage &&
//         <SearchRes buses={state}></SearchRes>
//       }
//     </div>
//   );
// }

// export default Search;

import React, { useState, useEffect } from 'react'   // NEW CODE: added useEffect
import SearchRes from './SearchRes'
import './Search.css'
import BackHome from './BackHome'

function Search({ showBackHome = false }) {

  let [state,setState]=useState([])
  let [stage,setStage]=useState(false)


  // NEW CODE: states for autocomplete dropdown
  const [locations, setLocations] = useState([]);
  const [sourceInput, setSourceInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [showSourceList, setShowSourceList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);



  // NEW CODE: fetching all locations from backend
  useEffect(() => {

    const fetchLocations = async () => {

      try {

        const response = await fetch(
          "http://localhost:8080/api/buses/"
        );

        const data = await response.json();

        console.log("Bus data:", data);


        const places = [];


        data.forEach((bus)=>{

          places.push(bus.source);
          places.push(bus.destination);

        });


        // removing duplicate locations
        setLocations([...new Set(places)]);


      } catch(error) {

        console.log("Location fetch error:",error);

      }

    };


    fetchLocations();


  },[]);




  // NEW CODE: filter locations based on typing
  const filteredLocations = (value)=>{

    return locations.filter((place)=>

      place.toLowerCase()
      .includes(value.toLowerCase())

    );

  };




  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const source = formData.get("source");
    const destination = formData.get("destination");


    console.log(source, destination);


    try {

      const response = await fetch(
        "http://localhost:8080/api/buses/search?source=" +
          source +
          "&destination=" +
          destination +
          "&seats=1",
        {
          method: "GET",
        }
      );


      const data = await response.json();

      setState(data);

      setStage(true);


    } catch (error) {

      console.error("Error fetching buses:", error);

    }

  };



  return (
    <div>

      {showBackHome && <BackHome />}


      <div className='search'>

      <form onSubmit={handleSubmit}>


        <section className='autocomplete'>


          <label>From</label>


          <input

            type="text"

            name="source"

            placeholder="📍 Source"

            value={sourceInput}


            // NEW CODE: updates input while typing
            onChange={(e)=>{

              setSourceInput(e.target.value);

              setShowSourceList(true);

            }}


            // NEW CODE: opens dropdown
            onFocus={()=>setShowSourceList(true)}

            required

          />



          {
            showSourceList &&

              <div className="suggestions">

              <button
                type="button"
                className="close-suggestion"
                onClick={() => setShowSourceList(false)}
              >
                ✕
              </button>



              {
                filteredLocations(sourceInput)
                .map((place,index)=>(


                  <div

                    key={index}


                    // NEW CODE: selecting suggestion
                    onClick={()=>{

                      setSourceInput(place);

                      setShowSourceList(false);

                    }}

                  >

                    {place}

                  </div>


                ))

              }


            </div>

          }


        </section>






        <section className='autocomplete'>


          <label>To</label>


          <input

            type="text"

            name="destination"

            placeholder="📍 Destination"


            value={destinationInput}



            // NEW CODE: updates destination typing
            onChange={(e)=>{

              setDestinationInput(e.target.value);

              setShowDestinationList(true);

            }}



            // NEW CODE: opens destination dropdown
            onFocus={()=>setShowDestinationList(true)}

            required

          />




          {
            showDestinationList &&


            <div className="suggestions">
              <button
                type="button"
                className="close-suggestion"
                onClick={() => setShowDestinationList(false)}
              >
                ✕
              </button>

              {
                filteredLocations(destinationInput)
                .map((place,index)=>(


                  <div

                    key={index}


                    // NEW CODE: selecting destination
                    onClick={()=>{

                      setDestinationInput(place);

                      setShowDestinationList(false);

                    }}

                  >

                    {place}

                  </div>


                ))

              }


            </div>


          }



        </section>





        <section className='searchbut'>

          <button type="submit">
            🔎 Search
          </button>

        </section>


      </form>


      </div>



      {
        stage &&
        <SearchRes buses={state}/>
      }


    </div>
  );
}

export default Search;

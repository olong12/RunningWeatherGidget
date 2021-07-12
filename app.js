const messageEl = document.getElementById("text")
const loc = document.getElementById("location")
const icon = document.getElementById("icon")
const trails = document.getElementById("trails")
const temp = document.querySelector(".temperature p")
const desc = document.querySelector(".description p");
let hours = 0
let latitude = 0
let longitude = 0
const clothing = document.querySelector(".clothing")
const apiKey = "" //replace this with your own apiKey
const googleKey = ""
const weather = {}
const runwear = [{name:'Cap', description:'A cap with a visor keeps the sun and rain out of your face.', image:'<svg height="1em" width="1em" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs></defs><path d="M95.679 40.422c-1.138-10.424-11.94-18.194-14.783-20.09s-4.928-4.928-17.247-5.875c-20.658.379-32.979 10.803-35.442 13.267s-4.359 11.182-5.117 14.025-1.516 8.528-1.516 14.974c0 0-6.256 7.202-8.909 9.855S1.672 76.434 2.62 78.707c.948 2.274 7.013-.758 8.908-4.358 7.392-.568 14.973 1.326 21.417 4.738 6.444 3.41 12.319 7.771 22.744 8.339 10.424.568 24.069-17.058 28.429-23.313 4.17-.947 8.528.569 12.698 1.707 1.517-3.033 0-14.973-1.137-25.398z"></path><path d="M66.113 14.457c0 1.046-1.356.739-3.005.739s-2.966.307-2.966-.739c0-1.047 1.337-1.896 2.985-1.896s2.986.849 2.986 1.896z"></path></svg>'}
, {name:'Sunglasses', description:'Protect your eyes from the sun', image:'<svg height="1em" width="1em" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs></defs><path d="M51.385 40.983c.791 0 3.659-3.264 3.363-4.055-.297-.791-10.781-5.836-10.781-5.836s-3.066-1.483-5.638-1.682c-2.572-.198-10.089.692-10.089.692l-20.475 3.76s-4.154.495-4.451 1.582c-.297 1.089 0 11.573 4.056 18.299s5.725 9.623 14.54 9.99c2.374.099 3.73-6.015 4.353-8.407.501-1.932.903-4.096.676-5.811-.07-.534-.686-.909-.41-1.45.275-.539 3.674-.392 3.306 1.207-.055.238-.262.844-.023 1.866.531 2.273 4.25 13.455 10.604 16.977 6.354 3.523 19.406 3.315 22.169-.552s3.522-12.155 3.729-14.504c2.693-2.831 20.719-7.665 20.719-7.665s1.865-.414 3.039-1.658c1.174-1.242 2.9-3.453 3.315-3.384.414 1.588.138 6.077 1.242 7.044 1.105.967 1.312.176 1.865-1.934.76-2.9-.207-3.107-.829-4.42-.621-1.312.553-2.348-1.243-3.521-1.796-1.175-3.038-.208-4.765.414-1.727.621-20.305 6.698-22.377 6.976-2.072.276-13.467-.76-18.647-1.105-5.18-.345-15.834-1.564-18.577-.345-1.243.552-1.965.286-2.577.138-.613-.148-2.043-.622-2.948-1.865-1.163-1.596-10.083-3.66-10.083-3.66l11.257-1.934s2.763-.345 3.937-.76c1.175-.414 5.871-3.384 8.426-3.107 2.556.276 7.045 2.417 10.083 5.938 3.036 3.522 3.234 2.772 3.234 2.772z"></path></svg>'},
{name:'T-Shirt', description:'Technical fabrics with UV protection are best. Stay away from cotton.', image:'<svg height="1em" width="1em" viewBox="-10 -10 120 120" aria-hidden="true" focusable="false"><defs></defs><path d="M92.368 24.547c-.709-4.485-4.956-11.92-9.676-14.162C77.97 8.144 64.635 0 64.635 0 66.051 8.38 52.778 9.441 50 9.441 47.221 9.441 33.949 8.38 35.366 0c0 0-13.335 8.144-18.057 10.385-4.721 2.242-8.97 9.677-9.679 14.162-.706 4.485-.47 15.461-1.887 18.293 0 0 3.304 5.312 16.523 3.422 0 0 1.652-6.019 1.652-9.795 0 0 3.866 24.85 1.389 38.306-2.478 13.454-1.534 15.602-2.006 19.38-.472 3.775.652 3.005 2.952 3.252S40.6 100 50 100s21.448-2.348 23.748-2.595c2.299-.247 3.424.523 2.951-3.252-.473-3.778.473-5.926-2.007-19.38-2.477-13.456 1.389-38.306 1.389-38.306 0 3.776 1.652 9.795 1.652 9.795 13.218 1.889 16.523-3.422 16.523-3.422-1.416-2.832-1.18-13.808-1.888-18.293z"></path></svg>'},
{name:'Shorts', description:'Something light with a built-in liner. Avoid cotton or heavy fabrics.', image:'<svg height="1em" width="1em" viewBox="-15000 -15000 80800 80800" fill-rule="evenodd" clip-rule="evenodd" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" aria-hidden="true" focusable="false"><defs></defs><path d="M23146 35098l2254-8852 2254 8852 2628 10352c481 320 962 640 2349 826 1387 187 3682 241 6297-213s5550-1414 8485-2374c-213-2349-427-4696-960-8432-534-3736-1388-8859-2269-13955L41489 6066c-2934 641-5869 1281-8551 1589-2681 309-5110 285-7538 261-2428 24-4857 48-7538-261-2682-308-5617-948-8551-1589L6616 21302c-881 5096-1735 10219-2269 13955-533 3736-747 6083-960 8432 2935 960 5870 1920 8485 2374s4910 400 6297 213c1387-186 1868-506 2349-826l2628-10352z"></path></svg>'},
{name:'Long Sleeve Shirt', description:'Staying a little warmer in cooler weather. Technical fabrics are best.', image:'<path d="M73 90h8.33l-.58-54.45C80.41 21.23 73.11 18.86 60.81 15h-1.09a9.72 9.72 0 11-19.44 0h-1.09c-11.32 3.18-19.56 6.2-19.93 20.55L18.67 90H27l3.12-50.69 1 .27L31 47l3.19 8.35v10.82L30.84 86l-.64 4h39.54l-.64-4-3.36-20V55.18l3.19-8-.09-7.6 1-.27z"></path>'},
{name:'Reflective Gear', description:"You're much harder to see at night than you think! Make sure you are especially visible if you're running on or near roads.", image:'<svg height="1em" width="1em" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs></defs><path d="M67.39 73.12c0-.66-.27-1.311-.729-1.771-.94-.93-2.61-.93-3.54 0-.471.46-.73 1.11-.73 1.771 0 .649.26 1.3.73 1.76.47.47 1.109.74 1.77.74.65 0 1.3-.271 1.771-.74.458-.46.728-1.11.728-1.76zm10.179-24.63a2.502 2.502 0 00-2.59 2.409 2.517 2.517 0 002.41 2.591h.09a2.501 2.501 0 00.09-5zm-29.989-26c0 1.38 1.109 2.51 2.489 2.51 1.381 0 2.5-1.11 2.511-2.49 0-1.38-1.11-2.51-2.49-2.51a2.494 2.494 0 00-2.51 2.49zM77.1 44.67a2.494 2.494 0 001.7-3.101c-.39-1.319-1.78-2.09-3.1-1.699a2.496 2.496 0 00-1.7 3.1 2.494 2.494 0 003.1 1.7zm-55.85-3.26c-.4 1.319.359 2.71 1.68 3.109.24.07.48.101.72.101a2.5 2.5 0 002.391-1.78c.39-1.32-.36-2.72-1.681-3.11-1.32-.4-2.72.36-3.11 1.68zm46.78-15.39h-.01c-1.1-.83-2.67-.609-3.5.49s-.6 2.67.5 3.5c.45.34.98.5 1.5.5.761 0 1.511-.34 2-.99a2.5 2.5 0 00-.49-3.5zm-11.65-2.89c-.44 1.3.27 2.72 1.57 3.16a2.503 2.503 0 003.17-1.58 2.501 2.501 0 00-1.58-3.16 2.493 2.493 0 00-3.16 1.58zM29.52 35.649a2.499 2.499 0 00-4.089-2.869 2.512 2.512 0 00.61 3.489c.439.3.939.45 1.43.45a2.47 2.47 0 002.049-1.07zM23.31 57.12a2.488 2.488 0 00-1.479 3.199 2.496 2.496 0 002.34 1.65c.29 0 .58-.05.87-.16a2.496 2.496 0 001.479-3.21 2.501 2.501 0 00-3.21-1.479zm5.18 12.5c.54 0 1.09-.181 1.55-.54a2.51 2.51 0 00.399-3.521 2.495 2.495 0 00-3.51-.39 2.496 2.496 0 001.561 4.451zm12.909-43.25c.261 0 .521-.04.78-.12a2.508 2.508 0 001.59-3.16 2.493 2.493 0 00-3.149-1.59 2.485 2.485 0 00-1.59 3.149 2.48 2.48 0 002.369 1.721zM22.52 53.34h.07c1.38-.05 2.46-1.2 2.42-2.58s-1.19-2.46-2.57-2.42-2.47 1.19-2.43 2.57a2.509 2.509 0 002.51 2.43zm52.379 8.61a2.48 2.48 0 003.21-1.471 2.487 2.487 0 00-1.46-3.21 2.498 2.498 0 10-1.75 4.681zm-5.429 3.72a2.518 2.518 0 00.38 3.52 2.508 2.508 0 003.52-.38 2.518 2.518 0 00-.38-3.52 2.517 2.517 0 00-3.52.38zm5.2-32.75a2.495 2.495 0 00-3.48-.63 2.494 2.494 0 00-.63 3.479c.48.7 1.26 1.07 2.05 1.07.49 0 .99-.14 1.431-.44a2.512 2.512 0 00.629-3.479zm-41.07-2.5c.521 0 1.05-.16 1.5-.49a2.512 2.512 0 00.51-3.5 2.495 2.495 0 00-3.5-.51 2.495 2.495 0 001.49 4.5zm-.3 40.899a2.5 2.5 0 00-.74 1.771c0 .65.271 1.3.74 1.76.46.47 1.11.74 1.76.74.66 0 1.3-.271 1.771-.74a2.48 2.48 0 00.729-1.76c0-.66-.26-1.31-.729-1.771-.932-.939-2.602-.929-3.531 0zm38.15 8.101c0-.66-.271-1.3-.73-1.771-.939-.93-2.61-.93-3.54 0-.46.471-.729 1.11-.729 1.771s.27 1.31.729 1.77c.47.46 1.11.73 1.771.73.649 0 1.3-.271 1.77-.73.459-.461.729-1.11.729-1.77zM23.37 31.37a2.5 2.5 0 00-.61-3.48c-1.13-.8-2.69-.52-3.49.61a2.5 2.5 0 002.05 3.929 2.503 2.503 0 002.05-1.059zm57.46-2.73a2.513 2.513 0 00-3.48-.63 2.495 2.495 0 00-.63 3.48 2.505 2.505 0 002.061 1.079c.489 0 .979-.149 1.42-.449a2.513 2.513 0 00.629-3.48zM19.49 61.21a2.51 2.51 0 00-3.21-1.49 2.508 2.508 0 00-1.49 3.21 2.505 2.505 0 002.35 1.64c.29 0 .58-.05.86-.149 1.3-.48 1.96-1.92 1.479-3.21l.011-.001zm59.34 8.78a2.505 2.505 0 00-3.511.38 2.509 2.509 0 00.37 3.52 2.53 2.53 0 001.57.55c.73 0 1.46-.319 1.95-.93a2.497 2.497 0 00-.379-3.52zM50.09 12.5c-1.38 0-2.5 1.109-2.51 2.49 0 1.38 1.12 2.51 2.5 2.51s2.5-1.12 2.5-2.49a2.495 2.495 0 00-2.49-2.51zm34.979 36.25a2.518 2.518 0 00-2.59 2.42 2.494 2.494 0 002.41 2.58h.09c1.34 0 2.45-1.061 2.5-2.41a2.508 2.508 0 00-2.41-2.59zM15.74 42.399a2.506 2.506 0 003.109-1.689 2.505 2.505 0 00-1.689-3.11c-1.32-.39-2.71.36-3.11 1.69a2.506 2.506 0 001.69 3.109zm65.46-1.54a2.507 2.507 0 002.4 1.801c.23 0 .47-.03.7-.101a2.513 2.513 0 001.7-3.1 2.499 2.499 0 00-3.101-1.7 2.49 2.49 0 00-1.699 3.1zM24.59 70.25a2.51 2.51 0 00-3.521-.391 2.507 2.507 0 00-.39 3.511c.5.62 1.22.939 1.96.939.54 0 1.09-.18 1.561-.54a2.516 2.516 0 00.39-3.519zm57.34-5.69a2.508 2.508 0 003.22-1.46c.48-1.3-.18-2.74-1.47-3.22a2.51 2.51 0 00-3.22 1.47 2.499 2.499 0 001.47 3.21zm-9.41-44.55c-1.1-.83-2.67-.61-3.5.5-.83 1.1-.609 2.67.49 3.5h.01a2.504 2.504 0 003.5-.5c.82-1.1.6-2.67-.5-3.5zm-33.48-.76c.26 0 .52-.04.779-.12 1.311-.44 2.03-1.85 1.591-3.16a2.494 2.494 0 00-3.16-1.59h.01a2.491 2.491 0 00-1.6 3.15 2.515 2.515 0 002.38 1.72zM15.09 53.59c1.38-.05 2.47-1.2 2.43-2.58-.05-1.38-1.2-2.46-2.58-2.42s-2.46 1.19-2.42 2.58a2.496 2.496 0 002.49 2.42h.08zm43.66-37.58c-.44 1.31.27 2.73 1.58 3.16.26.09.529.13.79.13 1.04 0 2.02-.66 2.37-1.7a2.508 2.508 0 00-1.58-3.17 2.495 2.495 0 00-3.16 1.58zm-27.63 4.41a2.494 2.494 0 00-3.5-.51c-1.101.819-1.34 2.39-.511 3.489a2.507 2.507 0 003.5.521c1.101-.83 1.33-2.4.511-3.5zm-1.9 57.189c-.46.471-.729 1.11-.729 1.771s.27 1.3.729 1.77c.47.46 1.11.73 1.771.73.659 0 1.3-.271 1.77-.73.46-.47.73-1.109.73-1.77s-.271-1.3-.73-1.771c-.931-.929-2.612-.929-3.541 0zm42.02 6.351c-.46.46-.73 1.109-.73 1.77 0 .65.26 1.301.73 1.761.47.47 1.109.739 1.77.739s1.3-.27 1.771-.739c.46-.46.729-1.11.729-1.761 0-.67-.27-1.31-.729-1.77-.931-.93-2.611-.93-3.541 0zM17.22 27.069a2.497 2.497 0 10-4.089-2.869 2.502 2.502 0 00.61 3.489c.43.301.93.45 1.43.45a2.485 2.485 0 002.049-1.07zM37.46 12h.01a2.493 2.493 0 001.59-3.15 2.503 2.503 0 00-3.16-1.6 2.504 2.504 0 00.78 4.88c.259 0 .52-.04.78-.13zM50.1 5c-1.38 0-2.5 1.109-2.5 2.5 0 1.38 1.11 2.5 2.49 2.5h.01c1.37 0 2.49-1.11 2.5-2.49A2.51 2.51 0 0050.1 5zM24.64 18.399c.521 0 1.04-.17 1.49-.5 1.1-.819 1.33-2.39.51-3.5a2.513 2.513 0 00-3.5-.51 2.496 2.496 0 00-.51 3.5c.49.661 1.24 1.01 2.01 1.01zM15.22 74.54a2.497 2.497 0 103.121 3.899 2.504 2.504 0 00.39-3.51 2.5 2.5 0 00-3.511-.389zm75.49-12.05c-1.29-.48-2.73.18-3.22 1.47a2.507 2.507 0 002.35 3.38c1.01 0 1.96-.62 2.34-1.63a2.514 2.514 0 00-1.47-3.22zm-6.03 12.199a2.5 2.5 0 00-3.52.38c-.87 1.07-.7 2.65.38 3.511.46.38 1.02.56 1.569.56.73 0 1.45-.32 1.95-.93a2.516 2.516 0 00-.379-3.521zm.259-46.399c.49 0 .99-.141 1.42-.44 1.131-.79 1.421-2.35.631-3.479a2.494 2.494 0 00-3.48-.63 2.49 2.49 0 00-.63 3.479c.49.7 1.269 1.07 2.059 1.07zm7.621 20.73a2.488 2.488 0 00-2.58 2.41 2.503 2.503 0 002.41 2.59h.08c1.34 0 2.46-1.06 2.5-2.41a2.502 2.502 0 00-2.41-2.59zM9.97 35.46a2.505 2.505 0 00-3.11 1.689c-.39 1.32.36 2.71 1.69 3.11.23.07.47.1.71.1 1.08 0 2.07-.699 2.39-1.79h.011A2.515 2.515 0 009.97 35.46zM64.29 7.319a2.493 2.493 0 00-3.16 1.58 2.501 2.501 0 002.37 3.29c1.04 0 2.02-.659 2.37-1.71a2.496 2.496 0 00-1.58-3.16zm26.5 33.221a2.51 2.51 0 002.41-3.201 2.52 2.52 0 00-3.11-1.7 2.506 2.506 0 00-1.69 3.11 2.486 2.486 0 002.39 1.791zM77.51 17.51c.83-1.1.61-2.67-.49-3.5-1.1-.83-2.67-.61-3.5.5-.83 1.1-.609 2.67.49 3.5.45.33.98.5 1.51.5.75 0 1.5-.35 1.99-1zM12.45 63.8a2.496 2.496 0 00-3.21-1.48 2.502 2.502 0 00-1.49 3.211 2.506 2.506 0 002.35 1.63 2.49 2.49 0 002.339-3.36l.011-.001zM5.02 51.41v-.011zm5-.16a2.502 2.502 0 00-2.58-2.42 2.494 2.494 0 00-2.419 2.573 2.5 2.5 0 002.5 2.427h.08a2.51 2.51 0 002.419-2.58zm15.129 32.66a2.528 2.528 0 00-.729 1.77c0 .65.26 1.3.729 1.76a2.473 2.473 0 003.531 0c.47-.46.74-1.1.74-1.76s-.271-1.31-.73-1.77c-.93-.931-2.61-.931-3.541 0z"></path><path d="M72.5 50c0-12.813-10.79-23.166-23.727-22.467-11.804.628-21.347 10.773-21.273 22.613.049 7.595 3.893 14.599 10.282 18.737 1.389.899 2.218 2.449 2.218 4.146V85c0 5.514 4.486 10 10 10s10-4.486 10-10V73.03c0-1.701.814-3.243 2.179-4.122C68.642 64.741 72.5 57.673 72.5 50zM55 75H45v-1.971c0-3.4-1.683-6.52-4.5-8.344a17.451 17.451 0 01-8-14.571c-.058-9.21 7.361-17.1 16.539-17.589.322-.016.642-.025.961-.025 9.649 0 17.5 7.851 17.5 17.5 0 5.967-3.002 11.464-8.03 14.706C56.671 66.51 55 69.622 55 73.03V75zm-5 15c-2.757 0-5-2.243-5-5v-5h10v5c0 2.757-2.243 5-5 5z"></path></svg>'},
{name:'Jacket', description:"Lightweight material that's wind and waterproof is ideal.", image:'<svg height="1em" width="1em" viewBox="0 0 8.467 8.467" aria-hidden="true" focusable="false"><defs></defs><path d="M5.58 1.238a.231.231 0 01-.125.148l-.86.397h-.23v5.345h1.588v-2.25H4.898a.132.132 0 110-.264h1.093l.227-.794.36.723c.111.22.169.464.169.71v1.61h1.058V5.04c0-.281-.049-.56-.145-.824l-.65-1.784a1.729 1.729 0 00-.981-1.015zm-2.752.023l-.39.157a1.729 1.729 0 00-.983 1.014L.806 4.216a2.41 2.41 0 00-.145.824v1.824H1.72v-1.61c0-.246.057-.49.167-.71l.362-.723.227.794h1.096a.132.132 0 110 .265H2.514v2.249H4.1V1.784h-.223l-.926-.396a.231.231 0 01-.124-.128zM.661 7.13v.397H1.72V7.13zm6.086 0v.397h1.058V7.13zM3.704 1.11l.265.463-.926-.397.172-.207A.53.53 0 013.62.78h1.19a.53.53 0 01.44.235l.108.162-.86.397.264-.464M2.646 7.327v.36H5.82v-.36z" fill-rule="evenodd"></path></svg>'},
{name:'Gloves', description:"Thin gloves provide some warmth on colder days.", image:'<svg height="1em" width="1em" viewBox="0 0 1.296 0.798" fill-rule="evenodd" clip-rule="evenodd" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" aria-hidden="true" focusable="false"><defs></defs><path d="M.445.093A.043.043 0 00.36.086v.228C.36.323.352.33.343.33.334.33.326.323.326.314V.037a.042.042 0 00-.084.005v.272C.242.323.234.33.225.33.215.33.208.323.208.314V.093a.042.042 0 00-.085 0v.33L.077.345C.065.324.04.319.019.329c-.02.01-.023.037-.015.058l.063.174c.02.052.046.101.102.101h.293A.102.102 0 00.564.561L.563.173A.042.042 0 00.521.13a.043.043 0 00-.043.043v.141A.016.016 0 01.462.33C.452.33.445.323.445.314V.093zm.406 0C.851.07.87.051.894.051c.02 0 .038.015.041.035l.001.007v.221c0 .009.008.016.017.016C.962.33.97.323.97.314V.037a.042.042 0 01.084.005v.272c0 .009.008.016.017.016.009 0 .017-.007.017-.016V.093a.042.042 0 01.085 0v.33l.046-.078c.011-.021.037-.026.057-.016.021.01.024.037.016.058l-.064.174c-.019.052-.045.101-.101.101H.834A.102.102 0 01.732.561L.733.173C.733.149.752.13.775.13c.023 0 .042.019.042.043v.141c0 .009.008.016.017.016.01 0 .017-.007.017-.016V.093zm.29.603H.803A.034.034 0 00.769.73v.034c0 .019.015.034.034.034h.338a.034.034 0 00.034-.034V.73a.034.034 0 00-.034-.034zm-.987 0h.339c.019 0 .034.015.034.034v.034a.034.034 0 01-.034.034H.154A.034.034 0 01.12.764V.73C.12.711.136.696.154.696z"></path></svg>'},
{name:'Singlet', description:'A loose fitting singlet or sleeveless shirt will keep you comfortable on extra hot days.', image:'<svg height="1em" width="1em" viewBox="-0.2 -0.2 2.769 2.769" fill-rule="evenodd" clip-rule="evenodd" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" aria-hidden="true" focusable="false"><defs></defs><path class="Tanktop_svg__Tanktop_svg__fil1" d="M.447.951v1.298c.246.08.492.119.738.119.245 0 .491-.04.737-.119V.951A.614.614 0 011.7.566a1.256 1.256 0 01.016-.544L1.543.001l-.002.012c-.031.181-.081.48-.356.485C.91.503.859.198.829.015L.826.001.653.022c.045.183.051.377.016.544a.614.614 0 01-.222.385z"></path></svg>'},
{name:'Tights', description:'Keep your legs warmer when the weather is cooler.', image:'<path d="M38.481 13.041s-2.166 9.834 0 24.834c2.167 15 1.917 23.999 2.167 27.666s.916 7 1.5 13.417c.583 6.417.583 7.5.583 7.5s1.166.5 2.333.5 2.25-.75 2.25-.75V64.125s.417-17.084.5-20.334c.084-3.25.667-9.667.834-11.333.166-1.666 1.5-5.249 2 1.584s.333 25.083.333 25.083l.026 27.25s1.045.563 2.224.583c1.458.024 2.083-.583 2.083-.583s.53-5.179.834-7.917c.34-3.064 1.458-9.834 1.396-12.661-.066-3.004 2.009-20.805 2.521-24.505.372-2.688.712-5.259 1.436-10.542.479-3.5.621-7.234.597-10.864-.016-2.288-.865-6.845-.865-6.845s-8.585 3.166-22.752 0z"></path>'},
{name:'Sunglasses', description:'Ideally 30 SPF or higher.', image:'<svg height="1em" width="1em" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><defs></defs><g fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M43.854 6.5h12.291v15.573H43.854zm-5.729 45.301l2.5-.578m4.09 8.954l1.113-2.341m9.457 2.341l-1.113-2.341m7.703-6.035l-2.5-.578m.148-9.867l-2.004 1.621M50 36.708v2.599"></path><ellipse cx="50" cy="49.054" rx="4.949" ry="5.016"></ellipse><path d="M56.146 22.073c2.299.438 5.053 1.798 9.218 6.021 6.146 6.229 5.122 28.031-3.073 65.406H37.709c-8.194-37.375-9.218-59.177-3.073-65.406 4.166-4.222 6.919-5.583 9.218-6.021h12.292zM40.477 41.356l2.004 1.621"></path></g></svg>'}, ]
const KELVIN = 273

function success(pos) {
  let crd = pos.coords;
  latitude = crd.latitude
  longitude = crd.longitude
  let text = ""
  console.log(crd)
  /*
  text += `<p>Your current position is: </p>`
  text += `<p>Latitude : ${latitude} </p>`
  text += `<p>Longitude: ${longitude} </p>`
  messageEl.innerHTML = text
  */
  getReverseGeocodingData(latitude, longitude)
  getWeather(latitude, longitude)
}
function error() {
  messageEl.innerHTML = '<p> Geolocation is not supported by your browser </p>'
}
function updateClock() {
    let now = new Date(),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        let minutes = 0
        let timeofday = ''
        let hours = 0
        if (now.getMinutes() < 10) {
          minutes = '0' + now.getMinutes()
        } else {
          minutes = now.getMinutes()
        }
        if (now.getHours() >= 12) {
          if (now.getHours() == 12) {
              hours = 12
          }
          else {
              hours = now.getHours() % 12
          }
          timeofday = ' PM'
        } else {
          timeofday = ' AM'
          hours = now.getHours()
        }
        time =  hours + ':' + minutes + timeofday,
        date = [days[now.getDay()]+',',
                months[now.getMonth()],
                now.getDate()].join(' ');

    document.getElementById('time').innerHTML = [date, time].join(' ');
    setTimeout(updateClock, 1000);
}
function getReverseGeocodingData(lat, lng) {
    var reverseGeocoder=new BDCReverseGeocode();
    reverseGeocoder.getClientLocation({
        latitude: lat,
        longitude: lng,
    },function(result) {
        console.log(result);
        loc.innerHTML = `<p> ${result["city"]}, ${result["principalSubdivision"]}</p>`
    });
}
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data)
            let date = new Date(data.current.sunset * 1000)
            weather.sunset = date;
            weather.temperature = Math.floor(data.current.temp - KELVIN);
            weather.description = data.current.weather[0].description;
            weather.iconId = data.current.weather[0].icon;
            weather.wind = data.current.wind_speed;
            weather.cloud = data.current.clouds.all;
            weather.uvi = data.current.uvi;
            if (data.current.weather[0].description.includes("rain") || data.current.weather[0].description.includes("drizzle")) {
              weather.raining = true;
            } else {
              weather.raining = false;
            }
            if (data.current.weather[0].description.includes("thunderstorm")) {
              weather.thunderstorm = true;
            } else {
              weather.thunderstorm = false;
            }
        })
        .then(function(){
            displayWeather();
            displayRunwear();
        });
}
function displayWeather(){
    temp.innerHTML = ` ${celsiusToFahrenheit(weather.temperature)}°<span>F</span><div class="circle"></div>${weather.temperature}°<span>C</span>`;
    desc.innerHTML = ", " + toTitleCase(weather.description);
    icon.innerHTML = `<img id="icon" src="./icons/${weather.iconId}.png"/>`;
}
function celsiusToFahrenheit(temperature){
    return Math.floor((temperature * 9/5) + 32);
}
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function addRunwear(index){
    object = runwear[index]
    clothing.innerHTML += `<li><h3>${object.image}${object.name}</h3>${object.description}</li>`
}
function displayRunwear() {
    if (weather.cloud <= 30 || weather.raining) {
      addRunwear(0);
    }
    if (weather.cloud <= 50) {
      addRunwear(1);
    }
    let temp = celsiusToFahrenheit(weather.temperature)
    if (temp >= 75) {
      addRunwear(8)
      addRunwear(3)
    } else if(temp >= 45) {
      addRunwear(2)
      addRunwear(3)
    } else {
      addRunwear(4)
      addRunwear(6)
      addRunwear(7)
      addRunwear(9)
    }
    if (weather.sunset.getHours >= hours) {
      addRunwear(5)
    }
    if (weather.uvi >= 5) {
      addRunwear(10)
    }
    if (weather.thunderstorm) {
      messagEl.textContent = 'ALERT: THERE IS A THUNDERSTORM IN YOUR AREA'
    }
}
function render() {
  messageEl.innerHTML = ''
  loc.innerHTML = ''
  icon.innerHTML = ''
  temp.innerHTML = ''
  desc.innerHTML = ''
  clothing.innerHTML = ''
  navigator.geolocation.getCurrentPosition(success, error)
  updateClock();
}
function getLocation(latitude, longitude){
    let api = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=running%20trail&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:5000@${latitude},${longitude}&key=${googleKey}`

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            console.log(data)
            for (i = 0; i < data.candidates.length; i++) {
              console.log(data.candidates[i])
              trails.innerHTML += `<p>${data.candidates[i].name}, ${data.candidates[i].rating} stars</p> <ul>
                <li><div class="stars"><div class="percent" style="width: ${data.candidates[i].rating * 20}%;"></div></div></li>
              </ul>`
            }
        })
}
render()
getLocation(latitude, longitude)

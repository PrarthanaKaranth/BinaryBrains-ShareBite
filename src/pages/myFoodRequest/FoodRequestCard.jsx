import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useState } from 'react';
import emailjs from 'emailjs-com'; // EmailJS for sending contact form data

const FoodRequestCard = ({ food, handleDelete }) => {
    const { food_name, food_id, donator_email, donator_name, request_date, pickup_location, expired_time, donation_money, _id, food_status } = food;
    const [showContactForm, setShowContactForm] = useState(false); // State to toggle contact form visibility
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if donator email is available
        if (donator_email) {
            // Define multiple email addresses (comma-separated)
            const toEmails = "email1@example.com,email2@example.com"; // Add more emails as needed

            emailjs
                .sendForm(
                    "service_kustwgb", // Your EmailJS service ID
                    "template_itm7mmw", // Your EmailJS template ID
                    e.target, // Form element
                    "gCk_IXC_BetDoT-cV", // Your EmailJS user ID
                    { donorEmail: donator_email, to_email: toEmails } // Pass the donor's email and multiple recipients
                )
                .then(
                    (result) => {
                        alert("Message sent successfully!");
                        setFormData({
                            email: "",
                            subject: "",
                            message: "",
                        });
                    },
                    (error) => {
                        alert("Error sending message: " + error.text);
                    }
                );
        } else {
            alert("Donor email is not available.");
        }
    };

    return (
        <div>
            <div className='shadow hover:shadow-md p-4 border group'>
                <p className='py-1 dark:text-white'><b>Food Name :</b> <Link className='group-hover:text-primary-defaultPrimaryColor group-hover:underline' to={`/available-food/${food_id}`}> {food_name} </Link> </p>
                <p className='py-1 dark:text-white'><b>Donar Name :</b> {donator_name} </p>
                <p className='py-1 dark:text-white'><b>Donar Email :</b> {donator_email} </p>
                <p className='py-1 dark:text-white'><b>Expire Time :</b> {expired_time} </p>
                <p className='py-1 dark:text-white'><b>Pickup Location :</b> {pickup_location} </p>
                <p className='py-1 dark:text-white'><b>Request Date :</b> {request_date} </p>
                <p className='py-1 dark:text-white'><b>Your Donation Amount :</b> {donation_money} </p>
                <p className='py-1 dark:text-white'><b>Food Status :</b> <span className={food_status === "Available" ? "text-green-500" : "text-orange-500"}>{food_status}</span> </p>
                <div>
                    <button
                        className={`${food_status === "Available" ? "text-primary-700" : "text-[#00000061]"} underline mt-6`} 
                        onClick={() => 
                            food_status === "Available" ? 
                            handleDelete(_id) : 
                                swal({
                                    text: "This food is already delivered",
                                    icon: "warning",
                                    buttons: false,
                                }) 
                        }>
                            Cancel this Request
                    </button>
                    {/* Button to toggle contact form */}
                    <button 
                        className="mt-4 text-blue-500 underline"
                        onClick={() => setShowContactForm(!showContactForm)} >
                        Contact Us
                    </button>
                </div>

                {/* Conditional rendering of the contact form */}
                {showContactForm && (
                    <section className="bg-white dark:bg-gray-900 mt-4">
                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                                Contact Us
                            </h2>
                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                                Got a technical issue? Want to send feedback about a beta feature? Let us know.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="name@flowbite.com"
                                        required=""/>
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="Let us know how we can help you"
                                        required=""/>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Your message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Leave a comment..."
                                        required=""/>
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Send message
                                </button>
                            </form>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default FoodRequestCard;

FoodRequestCard.propTypes = {
    food: PropTypes.object,
    handleDelete: PropTypes.func
};

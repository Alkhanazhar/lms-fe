import { useState } from "react"
import RadioFilter from "../include/RadioFilter";
const Settings = () => {
    const handleCategorySwitch = (id) => setSelectedCategory(id);
    const categoryData = [
    {
        id: 2,
        title: "Profile Settings",
        element: <ProfileSettings />
    },
    {
        id: 3,
        title: "Password",
        element: <Password />
    },
    {
        id: 4,
        title: "Payment and Membership",
        element: <PaymentMembership />
    },
    {
        id: 5,
        title: "Email Address",
        element: <EmailAddress />
    },
    ]
    const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
    return (
        <div className="container-fluid row mx-auto g-4 row ">
            <div className="my-5 w-75 col-3 mx-auto">
                <h1 className="main-heading">Settings</h1>
                <div className="w-100 position-relative mt-4">
                    <div className="absolute d-flex gap-3 border-bottom">
                        {categoryData.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handleCategorySwitch(category)}
                                className={`p-3 fw-700 switch-btn  ${selectedCategory.id === category.id ? "switch-border switch-btn-color" : "switch-border-unActive"}`}
                            >{category.title}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-4 col-12 ">
                    {selectedCategory.element}
                </div>
            </div>
        </div>
    )
}

export default Settings

const ProfileSettings = () => {
    const classTypes = [
        { id: 'type1', value: 'private', label: 'Make my profile private' },
        { id: 'type2', value: 'away from search results', label: 'Remove my profile from search results' },
    ];
    const [selectedType, setSelectedType] = useState('');
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    return <div className="w-100 border bg-white">
        <h1 className="fs-2 fw-bolder  p-4 lh-1 border-bottom">Profile Settings</h1>
        <div className="p-4 mt-2">
            <h5 className="fw-bolder">Username</h5>
            <input type="text" className="form-control w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Your username" />
            <div className="row">
                <div className="col-12 col-md-6 mt-4">
                    <RadioFilter
                        options={classTypes}
                        name="classType"
                        selectedValue={selectedType}
                        onChange={handleTypeChange}
                        title="Privacy"
                    />
                </div>
            </div>
            <button className="btn-small-list rounded-1 px-4 py-1">Save Changes</button>
        </div>
    </div>
}
const Password = () => {
    return <div className="w-100 border bg-white">
        <h1 className="fs-2 fw-bolder p-4 lh-1 border-bottom">Password</h1>
        <div className="p-4">
            <h6>We will send a verification link to <strong>your_email@gmail.com.</strong> This update will not take place until you follow the instructions listed in that email.If you do not have access to <strong>your_email@gmail.com.</strong>, please contact support for assistance.</h6>
            <button className="btn-small-list rounded-1 px-4 py-1 mt-3">Reset Password</button>
        </div>
    </div>
}

const PaymentMembership = () => {
    return <div className="w-100 border bg-white">
        <h1 className="fs-2 fw-bolder p-4 lh-1 border-bottom">Payment and Membership</h1>
        <div className="p-4">

        </div>
    </div>
}

const EmailAddress = () => {
    const classTypes = [
        { id: 'type1', value: 'private', label: 'Make my profile private' },
        { id: 'type2', value: 'away from search results', label: 'Remove my profile from search results' },
    ];
    const [selectedType, setSelectedType] = useState('');
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    return <div className="w-100 border bg-white">
        <h1 className="fs-2 fw-bolder p-4 lh-1 border-bottom">Email Address</h1>
        <div className="p-4">
            <div><h5 className="fw-bolder">Current Email Address</h5>
                <input type="text" className="form-control w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Your username" />
            </div>
            <div className="mt-3">

                <h5 className="fw-bolder">New Email Address</h5>
                <input type="text" className="form-control w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Your username" />
            </div>
            <div className="mt-3">

                <h5 className="fw-bolder">Confirm New Email Address</h5>
                <input type="text" className="form-control w-50" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" placeholder="Your username" />
            </div>

            <button className="btn-small-list rounded-1 px-4 py-1 mt-3">Update Email</button>
            <h6 className="fw-bolder mt-4">
                We have received a request to change the email address associated with your account in the LMS  system. To confirm this change, please click the link below:

                [Confirm Email Change Link]

                For added security, we have sent a confirmation OTP to your current email address. Please enter the OTP to proceed with updating your email address.
            </h6>
        </div>
    </div>
}


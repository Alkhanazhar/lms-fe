import { Plus } from "lucide-react";
import { useState } from "react";
import RadioFilter from "../include/RadioFilter";

const Profile = () => {
    const categoryData = [
        {
            id: 1,
            title: "All Saved Courses",
            element: <AllSavedCourses />
        },
        {
            id: 2,
            title: "My Learning Path",
            element: <MyLearningPath />
        },
        {
            id: 3,
            title: "My List",
            element: <MyList />
        },
        {
            id: 4,
            title: "Watch history",
            element: <WatchHistory />
        },
    ]

    const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);

    const handleCategorySwitch = (id) => setSelectedCategory(id);
    return (
        <div className="container d-flex vh-100 justify-content-center">
            <div className="my-5 ">
                <h1 className="main-heading">My Courses</h1>
                <div className="w-100 position-relative mt-4">
                    <div className="absolute d-flex gap-4 border-bottom">
                        {categoryData.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySwitch(category)}
                                className={`p-md-3 p-2 fs-6 fw-bold switch-btn ${selectedCategory.id === category.id ? "switch-border switch-btn-color" : ""
                                    }`}
                            >{category.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-4 ">
                    {selectedCategory.element}
                </div>
            </div>
        </div>
    );
};

const AllSavedCourses = () => {

    const classDurations = [
        { id: 'duration1', value: '1hour', label: '< 1 hour' },
        { id: 'duration2', value: '1to2hours', label: '1-2 hrs' },
        { id: 'duration3', value: '2hoursPlus', label: '< 2 hours' }
    ];
    const classTypes = [
        { id: 'type1', value: 'online', label: 'Online' },
        { id: 'type2', value: 'offline', label: 'Offline' },
        { id: 'type3', value: 'hybrid', label: 'Hybrid' }
    ];
    const [selectedDuration, setSelectedDuration] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };
    const [selectedFilter, setSelectedFilter] = useState(null);
    return (
        <div className="d-flex w-100 align-items-center justify-content-center">
            <div className="text-start w-100">
                <div className="row ">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-12 col-md-4 ms-md-4 ms-0">
                                <RadioFilter
                                    options={classDurations}
                                    name="classDuration"
                                    selectedValue={selectedDuration}
                                    onChange={handleDurationChange}
                                    title="Class Duration"
                                />
                            </div>
                            <div className="col-12 col-md-6 mb-4">
                                <RadioFilter
                                    options={classTypes}
                                    name="classType"
                                    selectedValue={selectedType}
                                    onChange={handleTypeChange}
                                    title="Class Type"
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-center border mt-4">
                    <p className="mt-4 fw-bolder">You Havent watched any Courses yet.</p>
                    <button className="btn rounded bg-blue-color my-3 mx-auto"> Browse Courses</button>
                </div>
            </div>
        </div>
    )
}
const MyLearningPath = () => {
    return (
        <div className="d-flex w-100 align-items-center justify-content-start row gap-4">
            <div className="text-center dotted-border p-4 col-3 w-50 mx-auto">
                <p className="mt-2 fw-bolder mx-auto">You Havent Saved any Learning path yet.</p>
                <div className="path-btn-color my-3 mx-auto">View All Learning Path</div>
            </div>
        </div>
    )
}
const MyList = () => {
    return (
        <div className="d-flex w-100 align-items-center justify-content-start row gap-4">
            <div className="d-flex justify-content-end">
                <button className="d-flex align-items-center fw-light btn-small-list fs-6"><Plus className="small-icon" /> Create New List</button>
            </div>
            <div className="text-center dotted-border p-4 col-3 mx-auto w-50">
                <p className="mt-2 fw-bolder  mx-auto">You Haven't any Lists yet.</p>
            </div>
        </div>
    )
}

const WatchHistory = () => {
    return (
        <div className="d-flex w-100 align-items-center justify-content-center">
            <div className="text-center">
                <p className="mt-2 fw-bolder">You Havent watched any thing yet.</p>
                <button className="btn rounded bg-blue-color my-3"> Browse Courses</button>
            </div>
        </div>
    )
}


const FilterOptions = ({ title, options, onChange }) => (
    <div>
        <p className="mt-4 form-heading text-start fw-bolder">{title}</p>
        <div className="d-flex gap-2">
            {options.map((option) => (
                <div key={option.id} className="d-flex gap-1 align-items-center">
                    <input
                        type="radio"
                        id={`option-${option.id}`}
                        name={`${title}-filter`}
                        value={option.id}
                        onChange={() => onChange(option.id)}
                        className="profile-radio-btn form-check-input mb-0"
                    />
                    <label htmlFor={`option-${option.id}`} className="form-check-label form-heading mb-0 mt-0">
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    </div>
);

export default Profile;


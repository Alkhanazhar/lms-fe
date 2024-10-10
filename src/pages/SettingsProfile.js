import { useState } from "react";

const SettingsProfile = () => {

    let name = "Azure Aghan"

    const categoryData = [{
        id: 1,
        title: "Profile",
        element: <About name={name} />
    },
    {
        id: 2,
        title: "Achivement",
        element: <Achivement />
    },
    ]
    const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
    const handleCategorySwitch = (id) => setSelectedCategory(id);
    return <div className="w-100 ">
        {/* <h1 className="fs-2 fw-bolder lh-1  p-4">Profile</h1> */}
        <div >
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3 p-4 d-flex flex-column justify-content-start align-items-center">
                    <img src="https://static.skillshare.com/assets/images/default-profile-2020.jpg" alt="profile" className="rounded-pill w-75" />
                    <h2 className="mt-3 fw-bolder">{name}</h2>
                    <em className="d-none d-md-block">Add Headline</em>
                    <em className="mt-2 w-100 border-bottom pb-3 text-center d-none d-md-block">Link personal website</em>
                    <div className="row pt-3 pb-3 border-bottom w-100">
                        <div className="col-6 d-flex flex-column">
                            <div className="mx-auto mb-2">_ _</div>
                            <h6 className="text-center">Followers</h6>
                        </div>
                        <div className="col-6 d-flex flex-column">
                            <div className="mx-auto mb-2">_ _</div>

                            <h6 className="text-center">Following</h6>

                        </div>
                    </div>
                    <em className="mt-2 w-100  pb-3 text-center">Link Social Links</em>
                </div>

                <div className="col-12 col-md-6 col-lg-9">

                    <div className="w-100 position-relative ">
                        <div className="absolute d-flex gap-3 border-bottom ">
                            {categoryData.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategorySwitch(category)}
                                    className={`p-3 w-100 fw-semibold switch-btn  ${selectedCategory.id === category.id ? "switch-border switch-btn-color" : "switch-border-unActive"
                                        }`}
                                >{category.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 col-12 p-2 h-100 ">
                        {selectedCategory.element}
                    </div>
                </div>
            </div>
        </div>
    </div >
}

export default SettingsProfile;
const About = ({ name }) => {
    let about = null;
    return <div>
        <h1 className="fw-bolder">About Us</h1>
        <div>
            {about ? <h6>
                {about}
            </h6> : <h6>Hello ,I am {name}</h6>}
        </div>
    </div>
}
const Achivement = () => {
    const achievements = [
        {
            name: "Lifetime", card: [
                "Complete a Class",
                "Submit a Project",
            ]
        },
        {
            name: "Milestone", card: [
                "Save a Class",
                "Complete 3 Classes",
                "Complete 5 Classes",
                "Complete 10 Classes",
                "Complete 25 Classes",
                "Complete 50 Classes",
                "Complete 100 Classes",
                "Submit 3 Projects",
                "Submit 10 Projects",
                "Submit 25 Projects",
                "Submit 50 Projects",
                "Submit 100 Projects",
            ]
        },
        {
            name: "Community", card: [
                "Follow a Teacher",
                "Give Feedback",
                "Start Discussion",
                "Review a Class",
            ]
        },

    ]
    return <div>
        <h1 className="fw-bolder">Achivement Us</h1>

        <div className="mt-4">
            {achievements.map((item, index) => (
                <div className="mt-4" key={index}>
                    <h4 className="fw-bolder mb-3">{item.name}</h4>
                    <div className="row g-4">
                        {item.card.map((cardItem, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-6 col-xl-4 ">
                                <div className="card acheivements-card border rounded-3 shadow-sm">
                                    <div className="card-body cursor-pointer d-flex align-items-center flex-column justify-content-center">
                                        <img src="https://static.skillshare.com/assets/images/rewards/badges/incomplete/submit_a_project.svg" alt="card-acheivements" className="" />
                                        <div className="text-center card-text fs-6 mx-auto ">

                                            {cardItem}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    </div>
}


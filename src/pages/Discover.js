import { Bookmark, Filter, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import FilterIcon from '../include/FilterIcon';
import axios from 'axios';
import Navbar from '../include/Navbar';



const discoverSidebarNav = [{
    links: [
        { name: "All category", url: "/discover" },
    ],
},
{
    category: "Popular Topics",
    links: [
        { name: "Animation", url: "/discover/animation" },
        { name: "Graphic Design", url: "/discover/graphic-design" },
        { name: "Photography", url: "/discover/photography" },
        { name: "Marketing", url: "/discover/marketing" },
        { name: "Writing", url: "/discover/writing" },
    ],
},
{
    category: "Trending Classes",
    links: [
        { name: "Procreate Basics", url: "/trending/procreate-basics" },
        { name: "Adobe Photoshop", url: "/trending/adobe-photoshop" },
        { name: "Watercolor Techniques", url: "/trending/watercolor-techniques" },
        { name: "Digital Illustration", url: "/trending/digital-illustration" },
    ],
},
{
    category: "Categories",
    links: [
        { name: "All Classes", url: "/categories/all-classes" },
        { name: "Business", url: "/categories/business" },
        { name: "Creative Writing", url: "/categories/creative-writing" },
        { name: "Film & Video", url: "/categories/film-video" },
        { name: "Fine Art", url: "/categories/fine-art" },
    ],
},
{
    category: "Settings",
    links: [
        { name: "Profile", url: "/settings/profile" },
        { name: "Billing", url: "/settings/billing" },
        { name: "Notifications", url: "/settings/notifications" },
    ],
},
];

const cardsData = [
    {
        id: 1,
        title: 'Digital Marketing Fundamentals',
        description: 'Description for Digital Marketing Fundamentals. This is a sample description.',
        link: '/course/1',
        authorName: 'Neil Patel',
        duration: '1.30 hours'
    },
    {
        id: 2,
        title: 'SEO Strategies for Beginners',
        description: 'Description for SEO Strategies for Beginners. This is a sample description.',
        link: '/course/2',
        authorName: 'Rand Fishkin',
        duration: '2.30 hours'
    },
    {
        id: 3,
        title: 'Social Media Marketing Essentials',
        description: 'Description for Social Media Marketing Essentials. This is a sample description.',
        link: '/course/3',
        authorName: 'Mari Smith',
        duration: '1.30 hours'
    },
    {
        id: 4,
        title: 'Content Marketing Mastery',
        description: 'Description for Content Marketing Mastery. This is a sample description.',
        link: '/course/4',
        authorName: 'Ann Handley',
        duration: '2.0 hours'
    },
    {
        id: 5,
        title: 'Email Marketing Strategies',
        description: 'Description for Email Marketing Strategies. This is a sample description.',
        link: '/course/5',
        authorName: 'Chad White',
        duration: '3.0 hours'
    },
    {
        id: 6,
        title: 'PPC Advertising Techniques',
        description: 'Description for PPC Advertising Techniques. This is a sample description.',
        link: '/course/6',
        authorName: 'Larry Kim',
        duration: '1.30 hours'
    },
    {
        id: 7,
        title: 'Analytics and Data Insights',
        description: 'Description for Analytics and Data Insights. This is a sample description.',
        link: '/course/7',
        authorName: 'Avinash Kaushik',
        duration: '2.50 hours'
    },
    {
        id: 8,
        title: 'Influencer Marketing Trends',
        description: 'Description for Influencer Marketing Trends. This is a sample description.',
        link: '/course/8',
        authorName: 'Jay Baer',
        duration: '1.45 hours'
    },
    {
        id: 9,
        title: 'Affiliate Marketing Strategies',
        description: 'Description for Affiliate Marketing Strategies. This is a sample description.',
        link: '/course/9',
        authorName: 'Pat Flynn',
        duration: '2.20 hours'
    },
    {
        id: 10,
        title: 'Building a Brand Online',
        description: 'Description for Building a Brand Online. This is a sample description.',
        link: '/course/10',
        authorName: 'Seth Godin',
        duration: '1.50 hours'
    },
    {
        id: 11,
        title: 'Conversion Rate Optimization',
        description: 'Description for Conversion Rate Optimization. This is a sample description.',
        link: '/course/11',
        authorName: 'Peep Laja',
        duration: '1.9 hours'
    },
    {
        id: 12,
        title: 'Creating Effective Ad Campaigns',
        description: 'Description for Creating Effective Ad Campaigns. This is a sample description.',
        link: '/course/12',
        authorName: 'Ryan Deiss',
        duration: '2.1 hours'
    },
    {
        id: 13,
        title: 'Website Traffic Growth Hacks',
        description: 'Description for Website Traffic Growth Hacks. This is a sample description.',
        link: '/course/13',
        authorName: 'Brian Dean',
        duration: '2.4 hours'
    },
    {
        id: 14,
        title: 'Local SEO Optimization',
        description: 'Description for Local SEO Optimization. This is a sample description.',
        link: '/course/14',
        authorName: 'Mike Blumenthal',
        duration: '1.35 hours'
    },
    {
        id: 15,
        title: 'Digital Marketing Strategy',
        description: 'Description for Digital Marketing Strategy. This is a sample description.',
        link: '/course/15',
        authorName: 'Neil Patel',
        duration: '2.30 hours'
    }
];
const durationFilters = [
    { id: 1, label: "1 - 3 Hrs", value: "1_to_3_hours", description: "Content or activities between 1 to 3 hours long" },
    { id: 2, label: "3 - 4 Hrs", value: "3_to_4_hours", description: "Content or activities between 3 to 4 hours long" },
    { id: 3, label: "4 - 5 Hrs", value: "4_to_5_hours", description: "Content or activities between 4 to 5 hours long" },
    { id: 4, label: "5+ Hrs", value: "5_plus_hours", description: "Content or activities that are longer than 5 hours" }
];

const courseFilters = [
    { id: 1, label: "Beginner", value: "beginner", description: "Courses for beginners" },
    { id: 2, label: "Intermediate", value: "intermediate", description: "Courses for intermediate learners" },
    { id: 3, label: "Advanced", value: "advanced", description: "Courses for advanced learners" },
    { id: 4, label: "Certification", value: "certification", description: "Courses that provide certification" }
];


const Discover = () => {
    const [activeCategory, setActiveCategory] = useState("All category");
    const [courses, setCourses] = useState([])

    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const [category, setCategry] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relavant");

    const fetchCourses = async () => {
        try {
            const response = await axios.get("/courses/type/" + "PUBLIC");
            setCourses(response?.data);
            console.log(response?.data);
            // toast.success("Courses fetched successfully");
        } catch (error) {
            console.log(error);
            // toast.error("Error fetching courses");
        }
    };

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategry((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategry((prev) => [...prev, e.target.value]);
        }
    };
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    const handleToggleFilter = () => {
        setShowFilter((prev => !prev))
    }

    const applyFilter = useCallback(() => {
        let productsCopy = courses.slice();
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                category.includes(item.category)
            );
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) =>
                subCategory.includes(item.category)
            );
        }
        setFilterProducts(() => productsCopy);
    }, [category]);

    const applySort = () => {
        const productsCopy = filterProducts.slice();

        switch (sortType) {
            case "low-high":
                setFilterProducts((item) =>
                    productsCopy.sort((a, b) => a.price - b.price)
                );
                break;
            case "high-low":
                setFilterProducts((item) =>
                    productsCopy.sort((a, b) => b.price - a.price)
                );
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();

    }, [category, subCategory, applyFilter]);
    useEffect(() => {
        applySort();
    }, [sortType]);
    useEffect(() => {
        fetchCourses()
    }, [])


    if (showFilter) {
        return <div className='filter position-relative d-md-none d-block'>
            <X className='position-absolute m-2 ' onClick={handleToggleFilter} />
            <h1 className='text-center p-3 fs-1 fw-semibold border-bottom'>Filters</h1>
            <div className="col-12 col-md-4 ">
                <h2 className='px-4 fs-6 my-2 fw-semibold'>Course Duration</h2>
                <div className='d-flex gap-4 px-4 flex-wrap mt-3'>
                    {durationFilters.map((category) => {
                        return (
                            <p className="d-flex gap-4 align-items-center checkbox-font m-0 p-0 w-100 justify-content-start" key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.value}
                                    onChange={toggleCategory}
                                    className="h-4 w-4 appearance-none border border-gray-300 rounded-sm bg-gray-100 checked:bg-purple-600 checked:border-transparent focus:outline-none dashboard-radio border-black"
                                />
                                <span className='fs-6 fw-medium'>{category.label}</span>
                            </p>
                        );
                    })}
                </div>
                <h2 className='fs-6 px-4 fw-semibold my-2 mt-4'>Course Level</h2>
                <div className='d-flex gap-3 px-4 flex-wrap mt-3'>
                    {courseFilters.map((category) => {
                        return (
                            <p className="d-flex gap-4 align-items-center checkbox-font m-0 p-0 w-100 justify-content-start" key={category.id}>
                                <input
                                    type="checkbox"
                                    value={category.value}
                                    onChange={toggleCategory}
                                    className="h-4 w-4 appearance-none border border-gray-300 rounded-sm bg-gray-100 checked:bg-purple-600 checked:border-transparent focus:outline-none dashboard-radio border-black"
                                />
                                <span className='fs-6 fw-medium'>{category.label}</span>
                            </p>
                        );
                    })}
                </div>
                <hr />
                <div className="col-md-3 col-lg-2 d-flex flex-column d-block d-md-none ">
                    <h2 className='fs-2  fw-bolder text-center'>Course Categories</h2>
                    {discoverSidebarNav.map((item, index) => (
                        <div key={index}>
                            {item.category && <div className="fw-bolder mb-2 text-start border-bottom text-sm fs-6 px-3 mx-2 mt-2 py-2" >
                                {item.category}
                            </div>}
                            {item?.links && item.links.map((link, ind) => (
                                <div
                                    key={ind}
                                    className={`text-start cursor-pointer px-3 mx-2 py-2 ${activeCategory === link.name
                                        ? 'selected-sidenav'
                                        : 'text-dark'
                                        }`}
                                    onClick={() => setActiveCategory(link.name)}
                                >
                                    <div className="text-decoration-none">
                                        {link.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    }
    return (
        <>
            <Navbar />

            <div className="container-fluid row mx-auto">
                {/* siddebar */}
                <div className="col-md-3 col-lg-2 d-flex flex-column pt-5 d-none d-md-block bg-white">
                    {discoverSidebarNav.map((item, index) => (
                        <div key={index}>
                            {item.category && <div className="fw-bolder mb-2 text-start border-bottom text-sm fs-6 px-3 mx-2 mt-2 py-2" >
                                {item.category}
                            </div>}
                            {item?.links && item.links.map((link, ind) => (
                                <div
                                    key={ind}
                                    className={`text-start cursor-pointer px-3 mx-2 py-2 ${activeCategory === link.name
                                        ? 'selected-sidenav'
                                        : 'text-dark'
                                        }`}
                                    onClick={() => setActiveCategory(link.name)}
                                >
                                    <div className="text-decoration-none">
                                        {link.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="col-md-9 col-lg-10">
                    <h1 className=" p-4 fw-bold main-heading mt-2 border-bottom">All Online Courses</h1>
                    <div className="row ms-md-2">
                        <div className="container mt-2 d-none d-md-block ">
                            <div className="row ">
                                <div className="col-12 col-md-6 col-lg-4 ">
                                    <h3>Course Duration</h3>
                                    <div className='d-flex gap-4'>
                                        {durationFilters.map((category) => {
                                            return (
                                                <p className="d-flex gap-2 align-items-center checkbox-font" key={category.id}>
                                                    <input
                                                        type="checkbox"
                                                        value={category.value}
                                                        onChange={toggleCategory}
                                                        className="custom-checkbox"
                                                    />
                                                    {category.label}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <h3>Course Level</h3>
                                    <div className='d-flex gap-4'>

                                        {courseFilters.map((category) => {
                                            return (
                                                <p className="d-flex gap-2 align-items-center checkbox-font" key={category.id}>
                                                    <input
                                                        type="checkbox"
                                                        value={category.value}
                                                        onChange={toggleCategory}
                                                        className="custom-checkbox"
                                                    />
                                                    {category.label}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-md-end justify-content-between  align-items-center my-2 mx-md-4 ">
                        <button className='d-md-none btn blue-primary text-white px-3 my-2 py-2 rounded-5 d-flex align-items-center justify-content-center gap-2' onClick={handleToggleFilter}>
                            <FilterIcon />
                            categories</button>
                        <div className="d-flex flex-row justify-content-end align-items-center ">
                            <div className="d-flex justify-content-end align-items-center gap-2">
                                <p className="checkbox-font mb-0 no-wrap ">SORT BY</p>
                                <select className="form-select form-select-sm custom-select rounded-4 py-2 px-4 ">
                                    <option value={"Trending"}>Trending</option>
                                    <option value={"Newest"}>Newest</option>
                                    <option value={"Most Popular"}>Most Popular</option>
                                    <option value={"Top Rated"}>Top Rated</option>
                                </select>
                                <select className="form-select form-select-sm rounded-4 py-2 px-4 d-none d-md-block">
                                    <option value={"date"}>Date</option>
                                    <option value={"relevance"}>Relevance</option>
                                    <option value={"alphabetical"}>Alphabetical</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 p-md-4 ">
                        {courses?.map(card => (
                            <div key={card.id} className="col-md-6 col-lg-4">
                                <div className="card position-relative rounded-3 border-0 shadow-sm">
                                    <img
                                        src={`https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                        className="card-img-top "
                                        alt={card.title}
                                    />
                                    <div className="card-body d-flex flex-column ">
                                        <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                            <span className="fs-6 fw-bolder">{card.title}</span>
                                            <span className="text-muted small ">{card.duration}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="text-muted small">{card.authorName}</span>
                                            <Bookmark className="text-muted cursor-pointer" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Discover;



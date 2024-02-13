import { Link } from "react-router-dom"


const Navigator = () => {

    return  <div>
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-6">
            <ul className="flex -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li className="me-2" role="presentation">
                    <Link to={'/'}>
                        <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-red-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Home</button>
                    </Link>
                </li>
                <li className="me-2" role="presentation">
                    <Link to={'/categories'}>
                        <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-red-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Categories</button>
                    </Link>
                </li>
            </ul>
        </div>
    </div>

}

export default Navigator


// TODO: need to add search user if time permits
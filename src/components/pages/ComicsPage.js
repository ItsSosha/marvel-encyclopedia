import AppBanner from "../appBanner/AppBanner"
import { Link, Routes, Route, Outlet } from 'react-router-dom';

export default function ComicsPage() {

    return (
        <>
            <AppBanner/>
            <Outlet />
        </>
    )
}
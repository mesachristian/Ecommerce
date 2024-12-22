import { useEffect, useState } from 'react'
import { ChevronRight, CreditCard, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useServices } from '@/context/service.context'
import { Navigate, useNavigate } from 'react-router'
import { User } from '@/models'

const ProfilePage = () => {

    const { authService } = useServices();

    const [loading, setLoading] = useState<boolean>(true);
    const [authUser, setAuthUser] = useState<User | null>();

    useEffect(() => {
        const fetchUserInfo = async() =>{
            setLoading(true);
            const userInfo = await authService.getUserInfo();
            setLoading(false);
            setAuthUser(userInfo);
        }

        fetchUserInfo().catch(console.log);
    },[]);
    
    if(loading){
        return <h1>Loading ...</h1>;
    }

    if(authUser == null){
        return <Navigate replace to={"/signin"} />;
    }

    return <LoggedInProfile />;
}

const LoggedInProfile = () => {

    const navigate = useNavigate();

    const { authService } = useServices();

    const [notifications, setNotifications] = useState(true);

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    }

    return (
        <div className='p-4'>
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User's profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">John Doe</h2>
                            <p className="text-gray-500">john.doe@example.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Change Password</p>
                                    <p className="text-sm text-gray-500">Update your password</p>
                                </div>
                                <ChevronRight className="text-gray-400" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Notifications</p>
                                    <p className="text-sm text-gray-500">Manage your notification preferences</p>
                                </div>
                                <Switch
                                    checked={notifications}
                                    onCheckedChange={setNotifications}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: '1234', date: '2023-05-15', status: 'Delivered' },
                                { id: '5678', date: '2023-06-02', status: 'Processing' },
                            ].map((order) => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Order #{order.id}</p>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Saved Addresses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: 1, address: '123 Main St, City, Country' },
                                { id: 2, address: '456 Elm St, Town, Country' },
                            ].map((address) => (
                                <div key={address.id} className="flex items-center justify-between">
                                    <p>{address.address}</p>
                                    <ChevronRight className="text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { id: 1, type: 'Visa', last4: '4321' },
                                { id: 2, type: 'Mastercard', last4: '8765' },
                            ].map((card) => (
                                <div key={card.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CreditCard className="text-gray-400" />
                                        <p>{card.type} ending in {card.last4}</p>
                                    </div>
                                    <ChevronRight className="text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Button>
            </div>
        </div>
    );
}

export default ProfilePage;
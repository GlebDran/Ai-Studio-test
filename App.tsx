
import React, { useState, useEffect } from 'react';
import { 
  Home as HomeIcon, 
  Search as SearchIcon, 
  Calendar, 
  User, 
  Heart, 
  ChevronLeft, 
  Star, 
  MapPin, 
  Users, 
  Wifi, 
  Flame, 
  Wind,
  Coffee,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_HOUSES, COLORS } from './constants';
import { House, Screen } from './types';
import { getPersonalizedRecommendation } from './services/geminiService';

// --- Components ---

const IconButton = ({ icon: Icon, onClick, active = false }: { icon: any, onClick: () => void, active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-full transition-all duration-300 ${
      active ? 'bg-[#4A5D4E] text-white shadow-lg scale-110' : 'text-[#A0AEC0] hover:bg-gray-100'
    }`}
  >
    <Icon size={24} />
  </button>
);

// Fix: Added optional children to Badge props type to resolve "Property 'children' is missing" errors
const Badge = ({ children }: { children?: React.ReactNode }) => (
  <span className="px-3 py-1 bg-[#F3F4F1] text-[#4A5D4E] rounded-full text-xs font-semibold uppercase tracking-wider">
    {children}
  </span>
);

// Fix: Added optional key to HouseCard props type to resolve "Property 'key' does not exist" error when mapping
const HouseCard = ({ house, onClick }: { house: House, onClick: () => void, key?: React.Key }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 mb-6 cursor-pointer"
  >
    <div className="relative h-64">
      <img 
        src={house.images[0]} 
        alt={house.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <Badge>{house.category}</Badge>
      </div>
      <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
        <Heart size={20} />
      </button>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        <div className="text-white">
          <h3 className="text-xl font-bold drop-shadow-md">{house.name}</h3>
          <div className="flex items-center gap-1 text-sm opacity-90">
            <MapPin size={14} />
            <span>{house.location}</span>
          </div>
        </div>
        <div className="bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Star size={14} className="text-[#D4A373] fill-[#D4A373]" />
          <span className="text-sm font-bold">{house.rating}</span>
        </div>
      </div>
    </div>
    <div className="p-5 flex justify-between items-center">
      <div>
        <p className="text-[#A0AEC0] text-sm uppercase tracking-widest font-medium">Starts from</p>
        <p className="text-xl font-bold text-[#2D3436]">€{house.price}<span className="text-sm font-normal text-[#A0AEC0]"> / night</span></p>
      </div>
      <button className="bg-[#4A5D4E] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform">
        View
      </button>
    </div>
  </div>
);

// --- Pages ---

const HomePage = ({ onHouseSelect, onExploreAI }: { onHouseSelect: (h: House) => void, onExploreAI: () => void }) => (
  <div className="px-5 pb-24 pt-8">
    <header className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-[#2D3436] tracking-tight">Escape into Nature</h1>
        <p className="text-[#A0AEC0] mt-1">Find your perfect sauna sanctuary</p>
      </div>
      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
        <img src="https://picsum.photos/seed/user1/100/100" alt="Profile" />
      </div>
    </header>

    <div 
      onClick={onExploreAI}
      className="mb-8 bg-gradient-to-br from-[#4A5D4E] to-[#6B7F6F] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-xl cursor-pointer"
    >
      <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-1">AI Concierge</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-4">Let our AI guide you to the perfect retreat based on your current mood.</p>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold">
          Explore recommendations
        </div>
      </div>
    </div>

    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Featured Houses</h2>
        <button className="text-[#4A5D4E] font-semibold text-sm">See all</button>
      </div>
      {MOCK_HOUSES.map(house => (
        <HouseCard key={house.id} house={house} onClick={() => onHouseSelect(house)} />
      ))}
    </section>
  </div>
);

const DetailsPage = ({ house, onBack, onBook }: { house: House, onBack: () => void, onBook: () => void }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="relative pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="relative h-[400px]">
        <img 
          src={house.images[activeImg]} 
          alt={house.name} 
          className="w-full h-full object-cover rounded-b-[3rem]" 
        />
        <div className="absolute top-12 left-5 right-5 flex justify-between">
          <button onClick={onBack} className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-[#2D3436] shadow-sm">
            <ChevronLeft size={24} />
          </button>
          <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-[#2D3436] shadow-sm">
            <Heart size={24} />
          </button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {house.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 transition-all duration-300 rounded-full ${idx === activeImg ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} 
            />
          ))}
        </div>
      </div>

      <div className="px-6 pt-8">
        <div className="flex justify-between items-start mb-2">
          <Badge>{house.category}</Badge>
          <div className="flex items-center gap-1">
            <Star size={18} className="text-[#D4A373] fill-[#D4A373]" />
            <span className="font-bold">{house.rating}</span>
            <span className="text-[#A0AEC0] text-sm">({house.reviews} reviews)</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#2D3436] mb-2">{house.name}</h1>
        <div className="flex items-center gap-2 text-[#A0AEC0] mb-6">
          <MapPin size={18} />
          <span>{house.location}</span>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto hide-scrollbar">
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[1.5rem] border border-gray-100 min-w-[80px]">
            <Users size={20} className="text-[#4A5D4E] mb-1" />
            <span className="text-xs font-bold">{house.capacity} Guests</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[1.5rem] border border-gray-100 min-w-[80px]">
            <Flame size={20} className="text-[#4A5D4E] mb-1" />
            <span className="text-xs font-bold">Sauna</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[1.5rem] border border-gray-100 min-w-[80px]">
            <Wifi size={20} className="text-[#4A5D4E] mb-1" />
            <span className="text-xs font-bold">WiFi</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-[1.5rem] border border-gray-100 min-w-[80px]">
            <Wind size={20} className="text-[#4A5D4E] mb-1" />
            <span className="text-xs font-bold">Fresh Air</span>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3">About this place</h3>
          <p className="text-[#4A4A4A] leading-relaxed opacity-80">
            {house.description}
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {house.amenities.map(amenity => (
              <div key={amenity} className="flex items-center gap-3 text-[#2D3436]">
                <div className="w-2 h-2 rounded-full bg-[#4A5D4E]" />
                <span className="text-sm font-medium">{amenity}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 flex justify-between items-center z-50">
        <div>
          <p className="text-2xl font-bold text-[#2D3436]">€{house.price}</p>
          <p className="text-[#A0AEC0] text-sm font-medium">total per night</p>
        </div>
        <button 
          onClick={onBook}
          className="bg-[#4A5D4E] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4A5D4E]/20 active:scale-95 transition-transform"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const BookingFlowPage = ({ house, onComplete }: { house: House, onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);

  return (
    <div className="p-6 bg-[#FDFBF7] min-h-screen">
      <header className="mb-10 pt-6">
        <h2 className="text-2xl font-bold">Confirm your trip</h2>
        <p className="text-[#A0AEC0]">{house.name}</p>
      </header>

      {step === 1 ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm">
            <h3 className="font-bold mb-4">Select Dates</h3>
            <div className="flex justify-between items-center border border-gray-100 p-4 rounded-2xl mb-4">
              <div className="text-center">
                <p className="text-xs text-[#A0AEC0] font-bold uppercase">Check-in</p>
                <p className="font-bold">Oct 24</p>
              </div>
              <div className="h-10 w-[1px] bg-gray-100" />
              <div className="text-center">
                <p className="text-xs text-[#A0AEC0] font-bold uppercase">Check-out</p>
                <p className="font-bold">Oct 26</p>
              </div>
            </div>
            <p className="text-sm text-center text-[#A0AEC0]">2 nights stay</p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm">
            <h3 className="font-bold mb-4">Who's coming?</h3>
            <div className="flex justify-between items-center bg-[#FDFBF7] p-4 rounded-2xl border border-gray-100">
              <span className="font-semibold">Guests</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold"
                >-</button>
                <span className="font-bold text-lg w-4 text-center">{guests}</span>
                <button 
                  onClick={() => setGuests(Math.min(house.capacity, guests + 1))}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold"
                >+</button>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2rem] font-bold text-lg shadow-lg"
          >
            Continue to Payment
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right duration-500">
          <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm">
            <div className="w-20 h-20 bg-green-50 text-[#4A5D4E] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
            <p className="text-[#A0AEC0] mb-8">We've sent a confirmation email with all the details for your stay at {house.name}.</p>
            
            <div className="bg-[#FDFBF7] p-6 rounded-2xl text-left border border-gray-100 mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-[#A0AEC0]">Total Price</span>
                <span className="font-bold">€{house.price * 2}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A0AEC0]">Reservation Code</span>
                <span className="font-mono text-sm font-bold">SK-7729-21</span>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2rem] font-bold text-lg shadow-lg"
            >
              Go to my bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AIConsiergeModal = ({ onClose }: { onClose: () => void }) => {
  const [mood, setMood] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      const rec = await getPersonalizedRecommendation(mood);
      setResult(rec || "I suggest a quiet forest retreat to clear your mind.");
    } catch (e) {
      setResult("I suggest a quiet forest retreat to clear your mind.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 animate-in slide-in-from-bottom duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-[#4A5D4E]" /> AI Concierge
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={24} className="rotate-[270deg]" />
          </button>
        </div>

        {!result ? (
          <>
            <p className="text-[#A0AEC0] mb-6 leading-relaxed">How are you feeling today? Our AI will match your mood to the perfect sauna experience.</p>
            <textarea 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g. I need complete silence and a break from the city noise..."
              className="w-full h-32 p-5 bg-[#FDFBF7] rounded-[2rem] border border-gray-100 focus:ring-2 ring-[#4A5D4E] outline-none resize-none mb-6"
            />
            <button 
              onClick={handleRecommend}
              disabled={loading || !mood}
              className={`w-full py-5 rounded-[2rem] font-bold text-lg transition-all ${
                loading || !mood ? 'bg-gray-200 text-gray-400' : 'bg-[#4A5D4E] text-white shadow-xl'
              }`}
            >
              {loading ? 'Finding your retreat...' : 'Get Recommendations'}
            </button>
          </>
        ) : (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <p className="text-[#4A5D4E] italic text-lg leading-relaxed mb-8 bg-[#F3F4F1] p-8 rounded-[2rem]">
              "{result}"
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2rem] font-bold text-lg shadow-lg"
            >
              Perfect, show me houses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [showAI, setShowAI] = useState(false);

  const handleHouseSelect = (house: House) => {
    setSelectedHouse(house);
    setCurrentScreen('details');
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home': 
        return <HomePage onHouseSelect={handleHouseSelect} onExploreAI={() => setShowAI(true)} />;
      case 'details':
        return selectedHouse ? (
          <DetailsPage 
            house={selectedHouse} 
            onBack={() => setCurrentScreen('home')} 
            onBook={() => setCurrentScreen('booking-flow')}
          />
        ) : null;
      case 'booking-flow':
        return selectedHouse ? (
          <BookingFlowPage 
            house={selectedHouse} 
            onComplete={() => setCurrentScreen('bookings')} 
          />
        ) : null;
      case 'search':
        return (
          <div className="p-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
            <SearchIcon size={64} className="text-gray-200 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Advanced Search</h2>
            <p className="text-gray-400">Search by dates, location, and sauna types is coming soon.</p>
          </div>
        );
      case 'bookings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm flex gap-4 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
                <img src={MOCK_HOUSES[0].images[0]} className="w-full h-full object-cover" />
              </div>
              <div>
                <Badge>Upcoming</Badge>
                <h3 className="font-bold mt-1">{MOCK_HOUSES[0].name}</h3>
                <p className="text-sm text-gray-400">Oct 24 - Oct 26</p>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Account</h1>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-20 h-20 rounded-[2rem] overflow-hidden">
                <img src="https://picsum.photos/seed/user1/200/200" alt="Profile" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Erik Kask</h2>
                <p className="text-gray-400">erik.kask@gmail.com</p>
              </div>
            </div>
            <div className="space-y-4">
              {['Personal info', 'Payments', 'Settings', 'Support'].map(item => (
                <div key={item} className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100">
                  <span className="font-semibold">{item}</span>
                  <ChevronLeft size={20} className="rotate-180 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <HomePage onHouseSelect={handleHouseSelect} onExploreAI={() => setShowAI(true)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FDFBF7] min-h-screen relative shadow-2xl overflow-x-hidden">
      {renderScreen()}

      {showAI && <AIConsiergeModal onClose={() => setShowAI(false)} />}

      {/* Bottom Navigation */}
      {currentScreen !== 'details' && currentScreen !== 'booking-flow' && (
        <nav className="fixed bottom-6 left-5 right-5 h-20 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl flex items-center justify-around px-4 border border-white/20 z-[90]">
          <IconButton 
            icon={HomeIcon} 
            active={currentScreen === 'home'} 
            onClick={() => setCurrentScreen('home')} 
          />
          <IconButton 
            icon={SearchIcon} 
            active={currentScreen === 'search'} 
            onClick={() => setCurrentScreen('search')} 
          />
          <IconButton 
            icon={Calendar} 
            active={currentScreen === 'bookings'} 
            onClick={() => setCurrentScreen('bookings')} 
          />
          <IconButton 
            icon={User} 
            active={currentScreen === 'profile'} 
            onClick={() => setCurrentScreen('profile')} 
          />
        </nav>
      )}
    </div>
  );
}

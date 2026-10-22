import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { whatsapp } from "../lib/site";
import { WhatsAppIcon } from "./Icons";

export const VEHICLES = [
  { name: "Mini car", value: "Mini car", image: "/images/taxi/0.png", seats: 2, note: "City hops and solo travellers" },
  { name: "Sedan", value: "Sedan car", image: "/images/taxi/2.png", seats: 3, note: "Airport runs in comfort" },
  { name: "Mini van", value: "Mini van", image: "/images/taxi/3.png", seats: 3, note: "Extra room for bags" },
  { name: "Flat-roof van", value: "Flat roof van", image: "/images/taxi/4.png", seats: 6, note: "Families and small groups" },
  { name: "High-roof van", value: "High roof van", image: "/images/taxi/6.png", seats: 10, note: "Groups with luggage, surfboards" },
  { name: "Mini bus", value: "Mini bus", image: "/images/taxi/5.png", seats: 21, note: "Weddings, teams and tours" },
];

const LIBS = ["places"];
const KEY = process.env.NEXT_PUBLIC_GOOGLE_API;

function PlaceInput({ id, label, value, onChange, placeholder, error, loaded }) {
  const ac = useRef(null);
  const input = (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      aria-invalid={!!error}
      className="field"
    />
  );
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      {loaded ? (
        <Autocomplete
          onLoad={(a) => (ac.current = a)}
          onPlaceChanged={() => {
            const p = ac.current?.getPlace();
            if (p) onChange(p.formatted_address || p.name || value);
          }}
          options={{ componentRestrictions: { country: "lk" } }}
        >
          {input}
        </Autocomplete>
      ) : (
        input
      )}
      {error && <p className="mt-1.5 text-sm font-medium text-earth">{error}</p>}
    </div>
  );
}

function WithMaps(props) {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: KEY, libraries: LIBS });
  return <BookingForm {...props} loaded={isLoaded} />;
}

export default function TaxiBooking(props) {
  return KEY ? <WithMaps {...props} /> : <BookingForm {...props} loaded={false} />;
}

const EMPTY = { passengerName: "", email: "", contactNumber: "", from: "", to: "", date: "", time: "", passengers: "", notes: "" };

function BookingForm({ loaded }) {
  const [vehicle, setVehicle] = useState(VEHICLES[1]);
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failMsg, setFailMsg] = useState("");

  const set = (k) => (val) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!v.passengerName.trim()) e.passengerName = "Add the lead passenger's name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Use an address like name@example.com.";
    if (!/^\+?[\d\s()-]{7,20}$/.test(v.contactNumber.trim())) e.contactNumber = "Use digits only, with your country code.";
    if (!v.from.trim()) e.from = "Add a pick-up point.";
    if (!v.to.trim()) e.to = "Add a drop-off point.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, vehicleType: vehicle.value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The booking didn't go through.");
      setStatus("sent");
      setV(EMPTY);
    } catch (err) {
      setFailMsg(err.message);
      setStatus("failed");
    }
  };

  const waText = `Hello Ayaan Tours, I'd like a transfer.\nVehicle: ${vehicle.name}\nFrom: ${v.from}\nTo: ${v.to}\nDate: ${v.date} ${v.time}\nPassengers: ${v.passengers}`;
  const Err = ({ k }) => (errors[k] ? <p className="mt-1.5 text-sm font-medium text-earth">{errors[k]}</p> : null);

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-40px_rgba(15,46,36,0.45)]">
      {/* vehicle stage */}
      <div className="relative bg-mist-200/60 px-5 pb-4 pt-6 sm:px-8">
        <div className="relative mx-auto h-36 max-w-md sm:h-44">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={vehicle.value}
              initial={{ x: "-60%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "60%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="absolute inset-0"
            >
              <Image src={vehicle.image} alt={vehicle.name} fill sizes="448px" className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-center text-[0.95rem] text-ink-600">
          <span className="font-semibold text-ink">{vehicle.name}</span>, up to {vehicle.seats} {vehicle.seats === 1 ? "guest" : "guests"}. {vehicle.note}.
        </p>
        <div role="radiogroup" aria-label="Vehicle" className="mt-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {VEHICLES.map((x) => {
            const on = x.value === vehicle.value;
            return (
              <button
                key={x.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setVehicle(x)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${on ? "text-mist" : "text-ink-600 hover:text-ink"}`}
              >
                {on && <motion.span layoutId="veh-pill" className="absolute inset-0 rounded-full bg-canopy" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{x.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="py-6">
              <p className="text-2xl font-semibold tracking-[-0.02em]">Transfer request sent</p>
              <p className="mt-2 font-serif text-lg text-ink-600">We'll confirm the price and your driver by email or WhatsApp, usually within a few hours.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-5 text-sm font-semibold text-canopy underline underline-offset-4">
                Book another transfer
              </button>
            </motion.div>
          ) : (
            <motion.form key="f" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
              <PlaceInput id="tx-from" label="Pick-up" placeholder="Airport, hotel or town" value={v.from} onChange={set("from")} error={errors.from} loaded={loaded} />
              <PlaceInput id="tx-to" label="Drop-off" placeholder="Where you're heading" value={v.to} onChange={set("to")} error={errors.to} loaded={loaded} />
              <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3 sm:col-span-2">
                <div>
                  <label htmlFor="tx-date" className="label">Date</label>
                  <input id="tx-date" type="date" className="field" value={v.date} onChange={(e) => set("date")(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="tx-time" className="label">Time</label>
                  <input id="tx-time" type="time" className="field" value={v.time} onChange={(e) => set("time")(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="tx-pax" className="label">Guests</label>
                  <input id="tx-pax" type="number" min="1" max="21" className="field" value={v.passengers} onChange={(e) => set("passengers")(e.target.value)} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="tx-name" className="label">Lead passenger</label>
                <input id="tx-name" className="field" autoComplete="name" value={v.passengerName} onChange={(e) => set("passengerName")(e.target.value)} aria-invalid={!!errors.passengerName} />
                <Err k="passengerName" />
              </div>
              <div>
                <label htmlFor="tx-email" className="label">Email</label>
                <input id="tx-email" type="email" className="field" autoComplete="email" value={v.email} onChange={(e) => set("email")(e.target.value)} aria-invalid={!!errors.email} />
                <Err k="email" />
              </div>
              <div>
                <label htmlFor="tx-phone" className="label">Phone / WhatsApp</label>
                <input id="tx-phone" type="tel" className="field" autoComplete="tel" placeholder="+44 7700 900123" value={v.contactNumber} onChange={(e) => set("contactNumber")(e.target.value)} aria-invalid={!!errors.contactNumber} />
                <Err k="contactNumber" />
              </div>
              {status === "failed" && (
                <p className="rounded-2xl bg-earth/10 px-4 py-3 text-[0.95rem] text-earth sm:col-span-2" role="alert">
                  {failMsg} Try again, or send it on WhatsApp.
                </p>
              )}
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn-dark">
                  {status === "sending" ? "Sending…" : "Request this transfer"}
                </button>
                <a href={whatsapp(waText)} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  Book on WhatsApp
                </a>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

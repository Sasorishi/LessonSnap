import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/spinner";
import axios from "axios";

const Lesson = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [playAudio, setPlayAudio] = useState(false);
  const [utterance, setUtterance] = useState(null);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.lang = "us-US";
      speechSynthesis.speak(newUtterance);
      setUtterance(newUtterance); // Stocke l'utterance dans l'état

      newUtterance.onend = () => {
        setPlayAudio(false);
      };
      setPlayAudio(true);
    } else {
      alert("Votre navigateur ne supporte pas la synthèse vocale.");
    }
  };

  const handleDemoSubmit = async () => {
    const demoText = `New York (CNN)When Liana Barrientos was 23 years old, she got married in Westchester County, New York.
      A year later, she got married again in Westchester County, but to a different man and without divorcing her first husband.
      Only 18 days after that marriage, she got hitched yet again. Then, Barrientos declared "I do" five more times, sometimes only within two weeks of each other.
      In 2010, she married once more, this time in the Bronx. In an application for a marriage license, she stated it was her "first and only" marriage.
      Barrientos, now 39, is facing two criminal counts of "offering a false instrument for filing in the first degree," referring to her false statements on the
      2010 marriage license application, according to court documents.
      Prosecutors said the marriages were part of an immigration scam.
      On Friday, she pleaded not guilty at State Supreme Court in the Bronx, according to her attorney, Christopher Wright, who declined to comment further.
      After leaving court, Barrientos was arrested and charged with theft of service and criminal trespass for allegedly sneaking into the New York subway through an emergency exit, said Detective
      Annette Markowski, a police spokeswoman. In total, Barrientos has been married 10 times, with nine of her marriages occurring between 1999 and 2002.
      All occurred either in Westchester County, Long Island, New Jersey or the Bronx. She is believed to still be married to four men, and at one time, she was married to eight men at once, prosecutors say.
      Prosecutors said the immigration scam involved some of her husbands, who filed for permanent residence status shortly after the marriages.
      Any divorces happened only after such filings were approved. It was unclear whether any of the men will be prosecuted.
      The case was referred to the Bronx District Attorney\'s Office by Immigration and Customs Enforcement and the Department of Homeland Security\'s
      Investigation Division. Seven of the men are from so-called "red-flagged" countries, including Egypt, Turkey, Georgia, Pakistan and Mali.
      Her eighth husband, Rashid Rajput, was deported in 2006 to his native Pakistan after an investigation by the Joint Terrorism Task Force.
      If convicted, Barrientos faces up to four years in prison.  Her next court appearance is scheduled for May 18.
      `;
    setMessage(demoText);
  };

  const handleSubmit = async () => {
    console.log(message);
    setLoading(true);

    speak();
    try {
      await axios
        .post("http://127.0.0.1:8000/api/summarization", {
          text: message,
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
          const result = JSON.stringify(response.data.summary);
          setSummary(result);
          speak(result);
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(result);
    } catch (error) {
      console.error("Erreur: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessage(null);
    setSummary(null);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(summary)
      .then(() => alert("Texte copié avec succès ! 📋"))
      .catch((err) => console.error("Erreur lors de la copie :", err));
  };

  const handleStopAudio = () => {
    if (speechSynthesis && utterance) {
      speechSynthesis.cancel();
      setPlayAudio(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl px-8 relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        Besoin d'aide pour réviser ?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">Sur le chemin de la réussi.</span>
          </div>
          {summary ? (
            <Card className="w-7xl mx-auto">
              <CardHeader>
                <CardTitle className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  Snap !
                </CardTitle>
                <CardDescription className="tracking-normal">
                  Votre résumé est prêt ! 🎉 Voici une version concise de votre
                  texte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label className="tracking-normal" htmlFor="name">
                        Résumé
                      </Label>
                      <Textarea
                        className="font-normal tracking-wide"
                        value={summary}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  className="tracking-normal"
                  variant="outline"
                  onClick={handleReset}
                >
                  Effacer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </Button>
                <Button className="tracking-normal" onClick={handleCopy}>
                  Copier
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 ml-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </Button>
                {playAudio ? (
                  <Button className="tracking-normal" onClick={handleStopAudio}>
                    Arreter
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    className="tracking-normal"
                    onClick={() => speak(summary)}
                  >
                    Ecouter
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <div className="mt-8 mb-8 w-7xl">
              <Textarea
                className="font-normal tracking-wide resize-none break-words"
                placeholder="Entrez votre texte ici pour générer un résumé."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    className="font-normal tracking-normal bg-primary hover:bg-white hover:text-black"
                    onClick={handleDemoSubmit}
                  >
                    Demo texte exemple
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </Button>
                  <Button
                    className="font-normal tracking-normal bg-primary hover:bg-white hover:text-black"
                    onClick={handleSubmit}
                  >
                    Valider
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 ml-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
};

export default Lesson;

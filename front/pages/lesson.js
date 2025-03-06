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

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "us-US";
      speechSynthesis.speak(utterance);
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
    setSummary(null);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(message)
      .then(() => alert("Texte copié avec succès ! 📋"))
      .catch((err) => console.error("Erreur lors de la copie :", err));
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
            <Card className="w-95 mx-auto">
              <CardHeader>
                <CardTitle>Snap !</CardTitle>
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
                </Button>
                <Button
                  className="tracking-normal"
                  onClick={handleCopy}
                  disabled={summary != ""}
                >
                  Copier
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="mt-8 mb-8">
              <Textarea
                className="font-normal tracking-wide resize-none break-words"
                placeholder="Type your message here."
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
                    disabled={message != ""}
                  >
                    Demo texte exemple
                  </Button>
                  <Button
                    className="font-normal tracking-normal bg-primary hover:bg-white hover:text-black"
                    onClick={handleSubmit}
                  >
                    Valider
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

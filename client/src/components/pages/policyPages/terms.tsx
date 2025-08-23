'use client'
import { Navbar } from "@/components/editor-components/navbar";
import { motion } from "motion/react";
import Image from "next/image";

const STATIC_CONTENT = [
  {
    title: "Registration",
    content: (
      <>
        <p>
          As per the terms defined for Reachoout, its selected services require
          ‘Registration’ from user. During registration, the user will be
          required to provide personal information such as name, address,
          contact details, e-mail address, etc. The information a user provides
          during registration will be kept secure in the Reachoout’s database.
          User is not required by law- to provide such information, however,
          without it, you cannot use the services supplied.
        </p>
        <p>
          User is asked to be accurate when giving the details and to provide
          correct information only. By purchasing services of Reachoout user
          agrees and declares that he/she has completed the minimum eligibility
          age I.e 18 years and is fully eligible to complete such contractual
          action without the need for permissions and consents.
        </p>
        <p>
          When registering user may be asked to choose a name and password. The
          user name and password will serve you for identification each time you
          use the services of the system.
        </p>
        <p>
          Keep your user name and password confidential. Change your password as
          often as possible, and in any case quarterly at least. Responsibility
          for actions taken using the account you created is yours alone. You
          will also be required to provide your email address; this address is
          the only address relevant regarding the password recovery.
        </p>
      </>
    ),
  },
  {
    title: "Adding Content to the site",
    content: (
      <>
        <p>
          Under the ‘Freedom of Expression’ there is always one of the
          cornerstones of the system, as well as keeping the laws on top.
          Obligation to these laws, you are prohibited from posting content/s of
          a vulgar sexual nature, threatening, defamatory, encouraging criminal
          or civil offenses, violate the privacy, damaging, hurts public feeling
          and content that constitute any kind of violation of the law; contents
          that their intellectual property rights do not belong to you; contents
          that contain computer viruses of any kind.
        </p>
        <p>
          The Provider (Reachoout) may refuse to publish content that he
          believes violate one or more of the above and/or may damage the system
          and/or any third party and may delete such content at any time without
          previous notice.
        </p>
        <p>
          The Provider shall bear no liability regarding the content found in
          the system and any end device on which they appear, the content,
          reliability, accuracy, credibility and influence on the computers of
          users of the system as well as any damage, inconvenience, loss, grief
          and so those results, directly or indirectly caused to you, your
          property or any third party for use of these contents.
        </p>
        <p>
          The content you post on the site or various end devices will be
          exposed to all users and the Provider cannot know what responses you
          may receive after submitting the content. Therefore, the Provider
          shall not be liable to you (or anyone on your behalf) for these
          responses or of any consequence caused to you or your property
          following these responses.
        </p>
      </>
    ),
  },
  {
    title: "Reachoout/Provider's Copyright",
    content: (
      <>
        <p>
          All copyrights and intellectual property from system and any software,
          application, computer code, design, graphics files, text and other
          material contained therein – are only of the Provider. You may not
          copy, distribute, publicly display or disclose to a third party any
          part of the above without getting the prior written consent of
          Reachoout.
        </p>
        <p>
          The trademarks on the website are the property of the Provider only –
          or if they were advertised, the property of those advertisers. No use
          should be made without their prior written consent.
        </p>
        <p>
          It is not allowed to move and/or copy tools/code/software/images, etc.
          from the Provider’s system without the written approval or as part of
          a product offered by the Provider.
        </p>
        <p>
          As part of the client’s website design, a variety of images will be
          presented to the client by the Provider. Clients may keep these images
          in his site only and may not sell/copy and/or reproduce the images to
          other places on the Web.
        </p>
        <p>
          For the avoidance of doubt, the client is not entitled in any case to
          use these images in any form of advertising and/or marketing and/or
          sale and/or copying for business cards and/or flyers and/or any other
          form of marketing outside the frame of the site.
        </p>
        <p>
          The Provider (Reachoout) may discontinue the use of a particular image
          by removing the image, without prior notice, even if the client is
          already using it. The Provider gives no warranty to find a suitable
          replacement for the client.
        </p>
        <p>
          It is not possible to build a site in the system and store it on
          another server or outside it.
        </p>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Reachoout’s Intellectual Property: All rights, title and interest in
          and to the Reachoout Services, including any and all copyrightable
          materials or any other content thereof which is or may be subject to
          any intellectual property rights under any applicable law (including
          any artwork, graphics, images, website templates and widgets, literary
          work, source and object code, computer code (including html),
          applications, audio, music, video and other media, designs,
          animations, interfaces, documentation, derivatives and versions
          thereof, the “look and feel” of the Reachoout Services, methods,
          products, algorithms, data, interactive features and objects,
          advertising and acquisition tools and methods, inventions, trade
          secrets, logos, domains, customized URLs, trademarks, service marks,
          trade names and other proprietary identifiers, whether or not
          registered and/or capable of being registered (collectively,
          ‘Intellectual Property’), and any derivations thereof, are owned by
          and/or licensed to Reachoout.
        </p>
        <p>
          Subject to your full compliance with the Reachoout Terms and timely
          payment of all applicable Fees, Reachoout hereby grants you, upon
          creating your User Account and for as long as Reachoout wishes to
          provide you with the its Services, a non-exclusive, non-transferable,
          non-sublicensable, fully revocable, limited license to use Provider’s
          Services and Licensed Content, for the purpose of generating and
          displaying your User Platform to End Users and offering your User
          Products (as defined below) therein, solely as expressly permitted
          under the Terms, and solely within the Reachoout Services.
        </p>
        <p>
          The Reachoout Terms do not convey any right or interest in or to its
          Intellectual Property (or any part thereof), except only for the
          limited license expressly granted above. Nothing in the Reachoout
          Terms constitutes an assignment or waiver of its Intellectual Property
          rights under any law.
        </p>
        <p>
          User’s Intellectual Property: As between Reachoout and you, you shall
          own all intellectual property pertaining to your User Content and to
          any other materials created by you, including to any designs, images,
          animations, videos, audio files, fonts, logos, illustrations,
          compositions, artworks, code, interfaces, text and literary works.
        </p>
        <p>
          Reachoout does not claim ownership rights on your content. For the
          sole purpose of granting you the service, You know and agree that we
          will need to access, upload and/or copy your User Content to our
          platform, including cloud services and CDN’s, to make display
          adjustments, to duplicate for backup and perform any other technical
          actions and/or uses required to perform our services, as we deem fit.
        </p>
      </>
    ),
  },
  {
    title: "User Content",
    content: (
      <>
        <p>
          User should confirm that user owns all rights in and to any content
          uploaded or provided by him/her, or imported, copied or uploaded by
          Reachoout Services for you, to your User Platform (User Content),
          including any designs, images, animations, videos, audio files, fonts,
          logos, code, illustrations, compositions, artworks, interfaces,
          usernames, information you provide for the purpose of creating a
          subdomain name, text, literary works and any other materials
          (Content), or otherwise have (and will continue to have) the full
          power, title, licenses, consents and authority, in and to the User
          Content, as necessary to legally access to, import, copy, use,
          publish, transfer or license such User Content, by you and us or any
          of our affiliates;
        </p>

        <p>
          In accordance to user’s content you have and will maintain the full
          authority, title, licenses, consents and power to allow Reachoout’s
          services to access any websites, web pages and/or other online
          services, for the purpose of importing, copying, displaying,
          uploading, transmitting and/or otherwise using, your ‘User Content’.
        </p>
        <p>
          The User Content is (and will continue to be) true, current, accurate,
          non-infringing upon any third-party rights, and in no way unlawful for
          you to upload, import, copy, possess, post, transmit, display or
          otherwise use, in the country in which you or your User Platform’s
          visitors and users (“End Users”) reside, or for Reachoout and/or your
          End Users to access, import, copy, upload, use or possess in
          connection with its Services;
        </p>
        <p>
          You have obtained all consents and permissions required under all
          applicable laws, regarding the posting, transmission and publication
          of any personal information and/or image or likeness of any person,
          entity or property which is part of the User Content, and you will
          adhere to all laws applicable thereto.
        </p>
        <p>
          If you believe that your work has been copied or was otherwise used in
          a way that constitutes copyright infringement, you may notify us of
          such infringement via a written form to be facilitated soon.
        </p>
      </>
    ),
  },
  {
    title: "Your Obligations",
    content: (
      <>
        <p>
          You represent and warrant that: You are eligible as individual or
          possess legal age of majority in your jurisdiction, and possess the
          legal authority, right and freedom to enter into the Reachoout’s Terms
          and to form a binding agreement, for yourself or on behalf of the
          person or entity committed by you to the Reachoout Terms.
        </p>
        <p>
          Your country of residence and/or your company’s country of
          incorporation is the same as the country specified in the contact
          and/or billing address you provide us;
        </p>
        <p>
          You understand that Reachoout does not provide any legal advice or any
          recommendation with respect to any laws or requirements applicable to
          your use or any of your End Users, or your compliance therewith.
        </p>
        <p>You undertake and agree to:</p>
        <p>
          You would fully comply with all applicable laws and any other
          contractual terms which govern your use of the Reachoout Services (and
          any related interaction or transaction), including those specific laws
          applicable to you or your End Users in any of your geographical
          locations;
        </p>
        <p>
          You would be solely responsible and liable with respect to any of the
          uses of the Reachoout Services which occur under your User Account
          and/or User Platform(s), and for any of your User Content (including
          for any consequences of accessing, importing, uploading, copying,
          using or publishing such User Content on or with respect to the
          Provide’s Services);
        </p>
        <p>
          You would regularly and independently save and backup any of your User
          Content and the information that is being processed by you regarding
          your User Platform, including with respect to End Users, User
          Products, and any applications and/or Third-Party Services used by
          you;
        </p>
        <p>
          You would receive from time-to-time promotional messages and materials
          from Reachoout or its partners, by mail, e-mail or any other contact
          form you may provide us with (including your phone number for calls or
          text messages). If you wish not to receive such promotional materials
          or notices – please just notify us at any time;
        </p>
        <p>
          You would allow Provider to use in perpetuity, worldwide and free of
          charge, any version of your User Platform (or any part thereof) for
          any of Provider’s marketing and promotional activities, online and/or
          offline, and modify it as reasonably required for such purposes, and
          you waive any claims against Reachoout or anyone on its behalf
          relating to any past, present or future moral rights, artists’ rights,
          or any other similar rights worldwide that you may have in or to your
          User Platform with respect to such limited permitted uses;
        </p>
        <p>
          Reachoout’s sole discretion as to the means, manner, and method for
          performing the Provider’s Services, including those regarding the
          hosting, transmission, publication and/or display of any User
          Platforms and/or Content (including the inclusion and presentation of
          any advertisements or other commercial content with respect thereto).
        </p>
        <p>
          Provider shall have the right to offer the Reachoout Services in
          alternative price plans and impose different restrictions as for the
          upload, storage, download and use of the Reachoout’s services in each
          price plan, including, without limitation, restrictions on network
          traffic and bandwidth, size and/or length of Content, quality and/or
          format of Content, sources of Content, volume of download time, number
          of subscribers to your Content, etc.
        </p>
        <p>Don’ts for you:</p>
        <p>
          Under the terms defined for the Reachoout webservices You must
          not-copy, modify, create derivative works of, download, adapt, reverse
          engineer, emulate, migrate to another service, translate, compile,
          decompile or disassemble the Reachoout’s Website, its Services (or any
          part thereof), any Content offered by Reachoout or Third Party
          Services for use and display within User Platforms and/or any part
          thereof in any way, or publicly display, perform, transmit or
          distribute any of the foregoing without Reachoout’s prior written and
          specific consent and/or as expressly permitted under the its Terms;
        </p>
        <p>
          You must not submit, transmit or display any User Content, or use
          Licensed Content in a context, which may be deemed as defamatory,
          libellous, obscene, harassing, threatening, incendiary, abusive,
          racist, offensive, deceptive or fraudulent, encouraging criminal or
          harmful conduct, or which otherwise violates the rights of Reachoout
          or any third party (including any intellectual property rights,
          privacy rights, contractual or fiduciary rights), or otherwise shows
          any person, entity or brand in a bad or disparaging light, without
          their prior explicit approval;
        </p>
        <p>
          You must not use any illegal action to collect login data and/or
          passwords for other websites, third parties, software or services. And
          must not collect, upload, or otherwise make available credit card
          information or other forms of financial data used for collecting
          payments, unless done in accordance with any applicable law,
          including, with the standard when applicable;
        </p>
        <p>
          You must not upload, insert, collect or otherwise make available
          within the Reachoout Website or its Services (or any part thereof),
          any malicious, unlawful, defamatory or obscene Content;
        </p>
        <p>
          You must not publish and/or make any use of the Reachoout Services or
          Licensed Content on any website, media, network or system other than
          those provided by the Provider, and/or frame, deep link, page scrape,
          mirror and/or create a browser or border environment around any of the
          Reachoout Services, Licensed Content and/or User Platform (or any part
          thereof), except as expressly permitted by the Provider, in advance
          and in writing;
        </p>
        <p>
          Must not use any robot, spider or other automatic device, program,
          script, algorithm, or other methodology similar or equivalent manual
          process, to access, acquire, copy, or monitor any portion of the
          Provider’s services (its data and/or Content), or in any way reproduce
          or circumvent the navigational structure to obtain or attempt to
          obtain any materials, documents, services or information through any
          means not purposely made available through the Provider’s services;
        </p>
        <p>
          Must not act in a manner which might be perceived as damaging to
          Reachoout’s reputation and goodwill or which may bring Reachoout into
          disrepute or harm;
        </p>
        <p>
          purchase search engine or other pay per click keywords (such as Google
          AdWords), or domain names that use Reachoout or its marks and/or
          variations and misspellings thereof;
        </p>
        <p>
          Don’t impersonate any person or entity or provide false information on
          the Reachoout Services and/or User Platform, whether directly or
          indirectly, or otherwise perform any manipulation in order to disguise
          your identity or the origin of any message or transmittal you send to
          Provider and/or any End Users;
        </p>
        <p>
          You not even falsely state or otherwise misrepresent your affiliation
          with any person or entity, or falsely express or imply that Reachoout
          or any third party endorses you, your User Platform, your business,
          your User Products, or any statement you make;
        </p>
        <p>
          Don’t reverse look-up, trace, or seek to trace another User of
          Reachoout Services, or otherwise interfere with or violate any other
          User’s right to privacy or other rights, or harvest or collect
          personally identifiable information about visitors or users of the
          Provider’s Services and/or User Platform without their express and
          informed consent;
        </p>
        <p>
          You should not disable, circumvent, bypass or otherwise avoid any
          measures used to prevent or restrict access to the Reachoout’s
          services, its platform, the account of another User (s), or any other
          systems or networks connected to the Reachoout services, by hacking,
          password mining, or other illegitimate or prohibited means;
        </p>
        <p>
          Do not probe, scan, or test the vulnerability of the Provider’s
          Services or any network connected to Reachoout’s Services;
        </p>
        <p>
          Must not upload to the Reachoout’s Services and/or User Platform or
          otherwise use them to design, develop, distribute and/or otherwise
          transmit or execute, any virus, web bug, spyware, malware, or any
          other computer code, file, or program that may or is intended to
          damage or hijack the operation of any hardware, software, or
          telecommunications equipment, or any other actually or potentially
          harmful, disruptive, or invasive code or component;
        </p>
        <p>
          Take any action that imposes an unreasonable or disproportionately
          large load on the infrastructure of the Reachoout Services or its
          systems or networks connected to the Reachoout’s Services, or
          otherwise interfere with or disrupt the operation of any of the its
          services, or the servers or networks that host them or make them
          available, or disobey any requirements, procedures, policies, or
          regulations of such servers or networks;
        </p>
        <p>
          Don’t use any of the Reachoout’s services and/or User Platform in
          connection with any form of spam, unsolicited mail, fraud, scam,
          phishing, “chain letters”, “pyramid schemes” or similar conduct, or
          otherwise engage in unethical marketing or advertising;
        </p>
        <p>
          No need to access to Reachoout’s services, User Accounts, Licensed
          Content and/or User Content, through any means or technology (e.g.
          scraping and crawling), other than our publicly supported interfaces.
        </p>
        <p>
          Must not sell, license, or exploit for any commercial purposes any use
          of or access to the Licensed Content and/or its Services, except as
          expressly permitted by the Reachoout Terms;
        </p>
        <p>
          Don’t remove or alter any copyright notices, watermarks, restrictions
          and signs indicating proprietary rights of any of our licensors,
          including copyright mark [©], Creative Commons [(cc)] indicators, or
          trademarks [® or ™] contained in or accompanying the Reachoout
          Services and/or Licensed Content; or
        </p>
        <p>
          Must not violate, attempt to violate, or otherwise fail to comply with
          any of the Reachoout’s Terms or any laws or requirements applicable to
          your use of the its Services.
        </p>
        <p>
          Don’t access or use the Services for benchmarking or similar
          competitive analysis purposes or in order to build a competitive
          product or service.
        </p>
      </>
    ),
  },
  {
    title: "Limitations of Liabilities",
    content: (
      <>
        <p>
          The Reachoout through its web-builder offers a wide range of tools
          that clients can make use of them, and they are given as they are. The
          Provider reserves the right to decide whether to add tools to the
          system, but the client will not have the option to require things that
          the system does not support. The Provider will make every effort to
          develop and upgrade the system – according to client requests, but he
          is not obligated to do so.
        </p>
        <p>
          The Provider may shut down the system, and change from time to time
          its structure, system appearance, and availability of services and
          content provided without the need for prior notice. The client will
          have no claim or demand against the Provider in connection therewith.
        </p>
        <p>
          Provider does not warrant that the service provided by the system
          (website builder) and the server will not be interrupted without
          malfunction and/or will be immune from unauthorized access to its
          computers, damages or malfunctions, failures in hardware, software, or
          the company’s communication lines or those of its Providers or harm by
          any reason otherwise, the Provider will not be liable for any direct
          or indirect damage, pain and suffering etc. caused to you or your
          property as a result. The Provider will do every effort to keep the
          service uninterrupted.
        </p>
        <p>
          The information a client submits to the system will be exposed to all
          Internet users and perhaps to additional information means. Be careful
          when providing your personal information (such as address or telephone
          number) and so in responses to inquiries received through use of the
          system or posting of your information there.
        </p>
        <p>
          Remember: Client needs to implement the same measure of caution while
          delivering information and receiving applications as when establishing
          contact when it is done not through the Internet.
        </p>
        <p>
          Payment for the use of the system does not make the payer owner or
          holder of the property or person responsible for the Provider’s
          system, including the system source code in any way.
        </p>
        <p>
          The Provider reserves the right to implement at any time certain
          system changes that may directly affect the client’s website’s
          appearance and ambiance. Reachoout website builder is a commercial
          product, therefore it makes every effort to ensure the client’s
          website’s exceptional performance.
        </p>
        <p>
          The provider, may without prior notice, change the functionality or
          design of the platform, or permanently or temporarily terminate them,
          to you or anyone else, generally including, but not limited to,
          modules, layouts, styles, fonts, third party tools, plugins and any
          other tool or functionality within the system. For any of these
          changes, for reasons stated or undisclosed, you will continue to be
          bound by the terms and conditions of this Agreement.
        </p>
      </>
    ),
  },
  {
    title: "Priivacy & Security",
    content: (
      <>
        <p>
          When using the Reachoout Builder information regarding your products
          and services purchased or sold, information or advertisement you read,
          the page views, the offers and services of interest to you, payment
          method you used may accumulate. Information will be used only under
          this Privacy Policy.
        </p>
        <p>
          The Provider will avoid as much as possible providing your personal
          information to third parties unless required to do so on – by court
          order, or if it faces the threat of legal action (criminal or civil)
          in respect of acts done by you in the system. In this case, the
          Provider may provide the information to the party claiming to have
          been damaged by you or in accordance with a judicial order.
        </p>
        <p>
          The Provider may use your information in order to improve the services
          offered by the system and adjust the system to your needs and
          preferences, as well as to contact you.
        </p>
        <p>
          Reachoout shall not be responsible for any information deleted from
          the system or maliciously hacked. Be sure to check who you add to the
          permissions to manage your system. Change your password as often as
          possible, and in any case every three months at least.
        </p>
        <p>
          Some of the tools in the system allow blocking pages or certain
          information to different users or at all. The Provider does not
          guarantee that this information is properly blocked and will not be
          accessible even without the proper permissions. It is recommended not
          to upload important or confidential information as the Provider does
          not guarantee its safety within the system.
        </p>
      </>
    ),
  },
  {
    title: "Legal Agreement",
    content: (
      <>
        <p>
          These Reachoout.com Terms of Use (“Terms of Use”), together with such
          additional terms which specifically apply to some of our services and
          features as presented on the Reachoout website(s) all set forth the
          entire terms and conditions applicable to each visitor or user (“User”
          or “you”).
        </p>
        <p>
          The Reachoout Terms constitute a binding and enforceable legal
          contract between Reachoout.com Pvt Ltd. and its affiliated companies
          and subsidiaries worldwide and you in relation to the use of any
          Reachoout Services – so please read them carefully.
        </p>
        <p>
          You may visit and/or use the Reachoout Services and/or the Reachoout
          App only if you fully agree to the Reachoout Terms – and by using
          and/or registering to any of the Reachoout Services, you signify and
          affirm your informed consent to these Terms of Use and any other
          Reachoout Terms applicable to your use of any of its services. If you
          do not read, fully understand and agree to the Reachoout Terms, you
          can exit the Reachoout website and avoid or discontinue all use of the
          its Services.
        </p>
        <p>
          The affiliate must not give the connecting details to any entity not
          authorized to access their account. All responsibility for
          uncontrolled access to the affiliate account due to the transfer of
          connecting details shall fall only on the affiliate account holder.
        </p>
        <p>
          The affiliate may not sell, transfer, endorse, give, or make
          commercial use of the rights assigned under this agreement.
        </p>
        <p>
          The affiliate declares and confirms that all information provided on
          the its site belongs to the Reachoout and that the affiliate has the
          right to distribute only the information and services that the
          affiliate’s website offers.
        </p>
        <p>
          The affiliate declares and confirms that in his site or in any other
          location wherein he advertises does not contain material which
          infringes the proprietary rights of others, particularly intellectual
          property rights.
        </p>
        <p>
          The affiliate declares and confirms that in his site or any other
          location wherein he advertises that all content does not contain any
          malicious computer program, computer code or application, including
          malware.
        </p>
        <p>
          The affiliate declares and confirms that his site or any other
          location wherein he advertises does not contain illegal material or
          material encouraging, supporting, assisting, and/or providing
          instructions or guides for performing an act which constitutes a
          criminal offense under national or international laws.
        </p>
        <p>
          The affiliate declares and confirms that his site or any other
          location wherein he advertises does not contain material of a
          harassing nature or insulting, hostile, threatening, obscene, racist,
          or abusive material that could be the basis for a civil claim or is
          otherwise in violation of national or international laws.
        </p>
        <p>
          By using our Services, you acknowledge that you have read our Privacy
          Policy available at (“Privacy Policy”).
        </p>
        <p>Backups:</p>
        <p>
          The Provider is not responsible for the client’s system backup and it
          is the client’s own responsibility to back up and keep a copy of any
          content that he uploads of any kind prior to uploading it to the
          system.
        </p>
        <p>
          Fraud: If any account is suspected of any fraud, the Reachoout
          reserves the right to cancel, close, or suspend the relevant affiliate
          account. In this case, the affiliate is not entitled to fees accrued
          in the account, unless it is proven that the fees were not achieved in
          the process of fraud, but in legal ways that do not violate these
          Terms of Use.
        </p>
      </>
    ),
  },
  {
    title: "Payment Policy",
    content: (
      <>
        <p>
          Purchasing a Reachoout’s product or service will be completed only
          after it is fully paid for. Although Reachoout reserves the right to
          change the prices for the services at any time, prices are guaranteed
          for prepaid periods.
        </p>
        <p>
          In the event of a credit card number or its validity causes a delay in
          clearing by credit card companies, the Provider may suspend
          immediately the services provided to the customer until the issue is
          resolved and payment is made in full.
        </p>
        <p>
          The Client is charged for payments in full every period in which the
          account is active from the date of opening the account. Any change in
          the credit card information must be reported immediately to continue
          to provide and receive services on an ongoing basis and without
          service interruptions.
        </p>
        <p>
          (To make certain that clients do not experience any interruption or
          loss of services, Reachoout products include an automatic renewal
          option by default. Unless a client turns off the auto-renewal option),
          Reachoout products will automatically renew. A website package will be
          renewed one day prior to the end of the applicable subscription
          period, while a domain will be renewed five days prior to its expiry
          date. The renewal period will be equal in time to the original
          subscription period.
        </p>
        <p>
          For example, if the original subscription period for a Reachoout
          product is twelve months, each of its renewal periods (where
          applicable) will be for twelve months. When applicable, Reachoout will
          attempt to automatically charge you the applicable Fees using the
          Stored Card (the last credit card used to make a payment on the
          account) for up to 45 days until payment is successfully collected. In
          the event of failure to collect the payment owed by you, Reachoout may
          in our sole discretion (but shall not be obligated to) retry to
          collect payment owed at a later time, and/or suspend or cancel your
          User Account, without further notice.
        </p>
        <p>
          By entering into this Agreement with Reachoout and by purchasing any
          Reachoout product, you acknowledge and agree that the products shall
          automatically renew in accordance with the above terms. You may turn
          off the auto-renewal option for any product at any time via your User
          Account or by speaking with Reachoout Customer Service team.
        </p>
        <p>
          Tax invoices in accordance with charges will be sent to the customer
          immediately after the billing to the email address. The system shall
          provide the customer with the invoices for this purpose.
        </p>
        <p>
          Payment by deposit/bank transfer or bank checks will count as the
          actual payment, but only after being fully redeemed and approved by
          the bank.
        </p>
        <p>
          Proportional refunds are not available for services paid long-term in
          advance.
        </p>
        <p>
          Refunds for all renewals, manual renewal and auto-renewals, of any
          service, are not provided.
        </p>
        <p>
          A 7-day money-back period is available after every initial purchase of
          a new website package. After this 7-day period has expired, no refund
          will be provided. The 7-day money-back period, which applies to
          website packages, does not apply to renewal payments (whether
          automatic or manual), domains, email accounts, and other services.
        </p>
      </>
    ),
  },
  {
    title: "Termination of the site",
    content: (
      <>
        <p>
          A customer interested in stopping the use of the services of the
          Provider previous the conclusion of the period of the connection can
          do so, but there will be no refund from the Provider. All transactions
          are final and in advance. It should be noted that the above applies to
          all products offered by the company.
        </p>
      </>
    ),
  },
  {
    title: "Purchase & Management of a Domain (Domain Name)",
    content: (
      <>
        <p>
          The relevant Registration Manager may accept or reject any request to
          register or renew the registration of a domain name, in his sole
          discretion and for any reason, including if he believes that the
          Domain name selected is forbidden for registration – according to the
          registration rules that binding him and the Provider will not be
          responsible if the domain is not renewed or it is purchased.
        </p>
        <p>
          The domain name you have chosen to register or renew will not be
          registered in your name until the Registration Manager performs the
          registration or renewal. The Provider has no control over the
          operation of the Registration Managers and is unable to warrant when
          or if the domain will be actually registered to you.
        </p>
        <p>
          The Provider is not responsible for any action, decision, act or
          omission of any Registration Managers and you shall have no claim or
          demand for any action, decision, act or omission by them – including,
          without limitation, in respect of the rejection of a request
          registration or renewal of registration of a domain name, the event
          that a domain registration or renewal has not performed as well as for
          each dismissal, suspension or cancellation of a domain registration.
        </p>
        <p>
          After ordering the domain name, it cannot be edited or replaced by
          another name.
        </p>
        <p>
          After ordering the domain name, it is possible to apply for a
          cancellation of registration but no refunds will be given for the
          remaining period.
        </p>
        <p>
          The process of transferring a domain name from one registry to another
          registry and renewal of a domain address that ended, can take up to
          five business days and in any case it is the responsibility of the
          relevant Registration Manager.
        </p>
        <p>
          The Provider hereby wishes to inform you that the Rules of the Global
          Internet Society (ICANN) for the domain names and generic extensions
          entered into force, aimed at ensuring that the details of the Domain
          names holder are correct, accurate and updated (COM, NET, BIZ, ORG,
          NAME, INFO, MOBI, etc.). When you register a new domain or update
          existing domain information, the duty of the holder is to confirm that
          the email address provided is correct and active. This confirmation is
          done by clicking on the link sent automatically to the email address
          specified in the domain. If the e-mail address was not verified until
          the 15th day from the date of registration/update – the domain will be
          suspended and will not be accessible; the suspension of the domain
          will not cause its deletion, but will rather stop its activity on the
          Internet. It should be noted that the suspension of the domain does
          not eliminate the need for renewal at the end of the initial
          registration period. That is if the domain is not renewed, it will
          eventually be deleted.
        </p>
      </>
    ),
  },
  {
    title: "Commercial e-mail advertisements",
    content: (
      <>
        <p>
          Do not send spam through the company’s services or by using the
          services of another company.
        </p>
        <p>
          If any problem should occur in the Provider’s servers or the ongoing
          work of the Provider, as a result of spamming, by any internal or
          external means, the Provider may use any means at his disposal
          including the termination of the services that the client receives
          from the Provider and even removing the site from the network without
          prior notice.
        </p>
        <p>
          Some of the system tools allow the client to send messages using
          advanced technological means (such as email, SMS, etc.). It is
          strictly forbidden utilizing these tools for sending spam messages and
          the Provider may terminate the client’s system activity that uses
          these tools inappropriately at any time and without previous notice.
        </p>
        <p>
          Using the system contains different elements for handling outgoing
          mail and removal requests of users from the mailing lists. The
          Provider does not guarantee that these tools meet the legal
          requirements in your country. The responsibility for checking whether
          these elements meet the appropriate requirements apply to you only and
          the Provider shall not have any responsibility in this matter.
        </p>
        <p>
          The Provider allows companies and users throughout the network to
          report spamming in order to detect factors that make it.
        </p>
        <p>
          No spam should be sent through other servers as well. Sites that do so
          may be blocked and must indemnify the Provider for any damage caused
          as a result of this.
        </p>
        <p>
          There are tools that enable the system monitoring user’s activities on
          the site by joining the mailing list. The Provider does not guarantee
          that the data presented in those lists are current or full in any way,
          and will not be responsible for them or their contents in case the
          owner of the site needs to use them.
        </p>
      </>
    ),
  },
  {
    title: "Designed Templates",
    content: (
      <>
        <p>
          Reachoout allows its client/s to select a design template for his site
          from a wide selection of templates being offered under different
          ranges as specified on its web-builder.
        </p>
        <p>
          Reachoout may discontinue the use of certain design templates without
          notice, even if the client already uses it. The Provider will make an
          effort to find a suitable replacement for the client, but he is not
          obligated to do so.
        </p>
        <p>
          Acquisition of a template is for a single site only and the client is
          not entitled to sell and/or copy and/or reproduce, etc. the template
          to other users.
        </p>
        <p>
          The client may use the images and template files only as received at
          the opening of the design template and is not allowed to edit photos
          and/or those files, or any part of them.
        </p>
        <p>
          Acquisition of design templates does not give the client copyright on
          it or other objects or other content related to it, and additional
          clients will be able to use it as decided by the Provider.
        </p>
        <p>
          For the avoidance of doubt, the client knows that all copyrights
          related to the template and/or image and/or objects found in the
          system belong to the Provider only.
        </p>
      </>
    ),
  },
  {
    title: "Purchasing and managing Emails",
    content: (
      <>
        <p>
          The Provider allows the client to purchase mailboxes under his domain
          name.
        </p>
        <p>
          The Provider is not responsible for incoming messages through this
          mailbox, including messages containing viruses and the client has to
          defend himself against these malicious items.
        </p>
        <p>
          The Provider does not back up the mailboxes and the client is
          responsible for downloading the incoming messages in his mailbox to a
          personal computer using the appropriate protocol. Messages remaining
          on the mail server will not be the responsibility of the Provider in
          case the information is damaged in any way.
        </p>
        <p>
          The provider shall not be responsible if the mail server operations
          will not function properly and the client messages will not reach
          their destination or are not received at the client’s mailbox.
        </p>
        <p>
          The Provider shall not be responsible for damage caused to content
          uploaded or received to the mail server (email messages, contacts,
          calendar, etc.).
        </p>
        <p>
          The Provider may limit the number of submissions performed from every
          box at his discretion in order to avoid situations of mail server
          blocking.
        </p>
        <p>
          The Provider may at any time remove user mailboxes from the mail
          server if he receives complaints from Internet service providers
          and/or spammer blacklists in the world.
        </p>
      </>
    ),
  },
  {
    title: "External Components & Services",
    content: (
      <>
        <p>
          Sometimes Reachoout may rely on external components supplied by third
          parties, including fonts, images, text, and audio to provide a certain
          level of functioning. Reachoout may bring an end to the use of these
          components at any time for any reason or no reason and the client will
          have no claim or demand against the Provider in connection therewith.
        </p>
        <p>
          For example some fonts appearing in the system are provided using
          Google Fonts. The use of these fonts are in accordance with the terms
          of use of Google Fonts and therefore any change in policy and terms of
          use of Google can bring a policy change by the Provider including
          stopping using these fonts completely and the client will have no
          claim or demand against the Provider in connection therewith. Also,
          the responsibility for checking the license for each font applies to
          the client. The conditions of use of Google Fonts are separately
          defined.
        </p>
      </>
    ),
  },
  {
    title: "Third party sites or links",
    content: (
      <>
        <p>
          The Reachoout builder may include links to websites of third parties.
          These sites are not controlled and/or owned by the Provider and he is
          not responsible for the contents of any linked site. These sites are
          the property of the third party and may be protected by copyright
          and/or intellectual property laws and/or any other protection. The
          Provider is providing these links only as a convenience and he does
          not approve and not assume any responsibility for the content,
          security, functionality or practices of such sites. Also, the
          inclusion of these links does not imply support of the Provider to the
          site or any contact with his handlers.
        </p>
        <p>
          You acknowledge and agree that the Provider may disable your use or
          remove any third party linked sites at any time.
        </p>
      </>
    ),
  },
  {
    title: "Technical Support",
    content: (
      <>
        <p>
          The Reachoout services on the site cover 24/7 technical chat support
          in a variety of languages as well as email, unless otherwise noted.
        </p>
        <p>
          In any case, if offered support the provider may, at his sole
          discretion, change the nature of the support, and/or hours of support
          and/or the ways in which it provides support including even stop
          providing support at all, and the client will have no claim in this
          regard.
        </p>
        <p>
          It is further noted that the provider may also stop providing client
          support to a certain client and this is if a client acted in an
          inappropriate manner towards any employees of the company and the
          decision in this matter is subject to the
        </p>
        <p>
          The Provider reserves the right to refuse admission of affiliates
          under the provider’s sole discretion only.
        </p>
      </>
    ),
  },
  {
    title: "The relationship between two parties",
    content: (
      <>
        <p>
          Under no occurrence or situation, will there be allowed an
          employer-employee relationship or partnership between the Provider and
          the affiliate.
        </p>
        <p>
          The affiliate may not display, directly or by implication, a message
          that suggests there is a link or any business cooperation besides the
          affiliate program, between the affiliate and the company.
        </p>
        <p>
          The affiliate may not display, directly or by implication, a message
          that suggests that the product does not belong to the Provider or is
          owned by the affiliate. You have to highlight and display the
          Provider’s trademarks and brand names when posting.
        </p>
        <p>
          The company reserves the right to terminate relationships with
          affiliates for any reason. In this case, a message will be sent by
          email and the termination shall be valid from the time it was sent.
          Commissions earned will be paid to the affiliate in the following
          month, as long as there is no suspicion of fraud whatsoever.
        </p>
      </>
    ),
  },
  {
    title: "Responsibility",
    content: (
      <>
        <p>
          Under no circumstances will the Provider and/or any of his
          representatives be responsible for any direct, indirect, punitive,
          incidental, special or consequential damages or any other damages of
          any kind, including and without limiting the generality of the above
          damages for loss of use, loss of data, or loss of profits, arising
          from or related in any way to any delay in use and the inability to
          use the company’s services and copyright violations arising from the
          content of the pages of the website.
        </p>
        <p>
          The Provider’s system offers a wide range of tools that clients can
          use and they are provided as they are. The Provider reserves the right
          to decide whether to add tools to the system and the affiliate or the
          client will not have any right to demand things that the system does
          not support.
        </p>
      </>
    ),
  },
  {
    title: "Terms of Use for Experts",
    content: (
      <>
        <p>
          The Reachoout is not responsible for the content and/or quality of
          work and/or authenticity of the content offered by the expert in his
          personal account or any other contract between him and any user using
          his services. The responsibility regarding the connection between the
          user and the expert applies to these parties only and the Provider is
          not a party in this matter.
        </p>
        <p>
          The expert agrees that the details he filled in the system, including
          personal details, are correct and complete. The expert also agrees to
          update this information if it changes.
        </p>
        <p>
          The expert undertakes to act in his name only and not to present
          himself in any event directly, implied or implicit, as if there is a
          link or any business collaboration besides the experts program,
          between the expert and the Provider. Also, in any situation, there
          will be no employer-employee relationship or a partnership between the
          Provider and the expert.
        </p>
        <p>
          It is known to the expert that any website he will design and create
          will be used solely in the Provider’s system and that the expert will
          have no claims of it.
        </p>
        <p>
          The expert confirms that with the purpose of building a website, he
          will not make use of any image and/or photo and/or a graphics file
          and/or text and/or computer code and/or any other work, that violates
          the intellectual property rights of any third party. Using storage
          images and files made available to him by the Provider is not
          exclusive and those can be used by other parties as well.
        </p>
        <p>
          The expert will compensate the Provider for any damages and/or costs
          incurred by it (including costs and attorney’s fees) in connection
          with any action brought against the Provider related with style,
          substance, content and intellectual property information that the
          expert provides.
        </p>
        <p>
          The Provider may delete an expert website according to the provider’s
          sole discretion.
        </p>
        <p>
          Any website that an expert creates for their own personal use cannot
          be considered an expert website or be categorized and treated as such.
        </p>
      </>
    ),
  },
  {
    title: "Service Fees",
    content: (
      <>
        Paid Services:
        <p>
          The use of certain Reachoout’s Services may be subject to payment of
          particular fees, as determined by the Provider in its sole discretion
          (“Paid Services” and “Free(s)”, respectively). Provider (Reachoout)
          will provide notice of such Fees then in effect in relation to such
          Paid Services. If you wish to receive or use such Paid Services, you
          are required to pay all applicable Fees in advance.
        </p>
        <p>
          Provider reserves the right to change its Fees at any time, upon
          notice to you if such change may affect your existing subscriptions.
          If you received a discount or other promotional offer, Reachoout shall
          have the right to automatically and without notice renew your
          subscription to such of its service(s) at the full applicable Fee.
        </p>
        <p>
          All Fees shall be deemed to be in Indian Rupee or U.S. Dollars, except
          as specifically stated otherwise in writing by Reachoout. To the
          extent permitted by law (and unless specified otherwise by Reachoout
          in writing), all Fees are exclusive of all taxes (including value
          added tax, sales tax, goods and services tax, etc.), levies or duties
          imposed by taxing authorities (“Taxes”), and you shall be responsible
          for payment of all applicable Taxes relating to your use of the
          Reachoout’s Services, or to any payments or purchases made by you. If
          Reachoout is obligated to collect or pay Taxes for the Fees payable by
          you, and whether or not such Taxes were added and collected from you
          for previous transactions, such Taxes may be added to the payment of
          any outstanding Fees and will be reflected in the Invoice for such
          transaction. We recommend that you verify the existence of any
          additional fees you may be charged by third parties in connection with
          the purchase of Paid Services or in connection with the renewal
          thereof (such as international transaction fees, currency exchange
          fees or fees due to banks or credit card companies). Reachoout is not
          responsible for any such additional fees or costs.
        </p>
        <p>
          As part of registering or submitting information to receive Paid
          Services, you also authorize Reachoout (either directly or through its
          affiliates, subsidiaries or other third parties) to request and
          collect payment and service fees (or otherwise charge, refund or take
          any other billing actions) from our payment provider or your
          designated banking account, and to make any inquiries Reachoout or its
          affiliates may consider necessary to validate your designated payment
          account or financial information, in order to ensure prompt payment,
          including for the purpose of receiving updated payment details from
          your payment, credit card or banking account provider (e.g., updated
          expiry date or card number as may be provided to us by your credit
          card company).
        </p>
        <p>
          Some of our services cost money. We will let you know how much
          beforehand. Our prices are stated in Indian Rupee and US Dollars and
          before taxes, unless otherwise said.
        </p>
        <p>
          If needed, we or our affiliates may request and collect payments and
          related information from the relevant payment providers and banks.
        </p>
      </>
    ),
  },
  {
    title: "Invoices",
    content: (
      <p>
        Reachoout and/or its affiliated companies will issue an invoice or
        credit memo for any payment of Fees or refund made to or by Reachoout
        (‘Invoice’). Each Invoice will be issued in electronic form and based on
        the country stated in your billing address, and will be made available
        to you via your User Account and/or by e-mail. For the purpose of
        issuing the Invoice, you may be required to furnish certain Personal
        Information (as such term is defined in the Privacy Policy) in order to
        comply with local laws. Please note that the Invoice presented in your
        User Account may be inadequate with your local law requirements, and in
        such case may be used for pro forma purposes only.
      </p>
    ),
  },
  {
    title: "Trial Period",
    content: (
      <>
        <p>
          Reachoout is entitled to use the system free of charge for a limited
          period or without limitation (trial period) as published and
          periodically updated (by the decision of the Reachoout). If a fixed
          period was set, the user can decide after the trial period, whether to
          continue to use the system and pay for a license to use it. The
          provider may change at any time the fixed period given to the client.
        </p>
        <p>
          Clients that will make use of the system in this framework agree with
          the following conditions:
        </p>
        <p>
          Sites during the trial period (without limitation” or limited period)
          are assigned subdomains. The provider reserves all rights to cancel or
          suspend the use of any “subdomain” at any time without reason. The
          user declares that he agrees and knows that all subdomains are owned
          by the provider and that he may for any reason or no reason, at its
          sole discretion and without notice or liability to User or any third
          party, terminate or suspend the user’s account and sub-domain, and
          remove or delete any content associated with the account, the user’s
          name and subdomain immediately.
        </p>
        <p>
          The provider may at any time change this condition and require the
          customer pays for continuing the use of the system. It is understood
          that the provider will not require payment for use prior to the change
          in this condition.
        </p>
        <p>
          The Provider may place advertisements alongside free services, without
          prior notice.
        </p>
        <p>
          Reachoout reserves the right to block and/or delete any information
          from your system, if and when the customer fails to make payment at
          the end of this period including discontinued payment if possible, in
          advance.
        </p>
        <p>
          Customers that used the trial period for opening multiple sites for
          this period and using them commercially in an inappropriate manner are
          at risk that the Provider will lock or delete these sites without
          notice.
        </p>
        <p>
          The Provider may send you several messages in different ways (email,
          text, etc.) during your trial
        </p>
      </>
    ),
  },
  {
    title: "Payments and Fees",
    content: (
      <>
        <p>
          For each user who purchases a website, the expert will receive a fixed
          price commission as it appears in the expert program and can be found
          in the expert program panel.
        </p>
        <p>
          The expert user must remain active for at least 1 full month (Subject
          to the consent with Provider Reachoout).
        </p>
        <p>
          Payment to the expert will be carried out only after providing an
          invoice that will be sent to the Provider, as subject to all national
          and international laws.
        </p>
      </>
    ),
  },
  {
    title: "Subscription Auto Renewals",
    content: (
      <>
        <p>
          In order to ensure that you do not experience any interruption or loss
          of services, certain Paid Services include an automatic renewal option
          by default, according to which, unless you turn-off the auto-renewal
          option, such Paid Services will automatically renew upon the end of
          the applicable subscription period, for a renewal period equal in time
          to the original subscription period (excluding extended periods) and,
          unless otherwise notified to you, at the same price (subject to
          applicable Taxes changes and excluding any discount or other
          promotional offer provided for the first period) (Renewing Paid
          Services). For example, if the original subscription period for a
          Service is one month, each of its renewal periods (where applicable)
          will be for one month. Accordingly, where applicable, Provider will
          attempt to automatically charge you the applicable Fees using the
          Stored Card, within up-to two (2) weeks before such renewal period
          commences. In the event of failure to collect the Fees owed by you, we
          may in our sole discretion (but shall not be obligated to) retry to
          collect on a later time, and/or suspend or cancel your User Account,
          without further notice. If your Renewing Paid Service is subject to a
          yearly or multiple-year subscription period, Reachoout will endeavor
          to provide you a notice prior to the renewal of such Paid Service at
          least thirty (30) days in advance of the renewal date.
        </p>
        <p>
          By entering into this Agreement and by purchasing a Renewing Paid
          Service, you acknowledge and agree that the Renewing Paid Service
          shall automatically renew in accordance with the above terms.
        </p>
        <p>
          You may turn-off the auto-renewal option for Renewing Paid Services at
          any time via your User Account or by visiting our Help Center.
        </p>
        <p>
          Certain domains are subject to a different renewal policy as detailed
          in the Domains Registration Agreement. Nonetheless anything to the
          contrary in the foregoing, you are and shall be solely responsible to
          verify and ensure the successful renewal of the Reachoout’s Services
          you use (whether or not such Provider’s Services are subject to
          automatic subscription renewals). Accordingly, you shall be solely
          responsible with respect to any discontinuation of any Reachoout’s
          services previously purchased by you, including due to a cancellation,
          failure to charge the applicable recurring Fees, or due to any its
          services not being subject to automatic subscription renewals. You
          acknowledge and agree that you shall not have any claims against
          Reachoout in relation to the discontinuation of any Provider’s
          services or Third-Party Services, for whatever reason.
        </p>
        <p>
          Changes to the Terms of Use: Reachoout may change these terms and
          conditions from time to time and without giving prior notice.
        </p>
          <p>
            Certain domains are subject to a different renewal policy as
            detailed in the Domains Registration Agreement. Nonetheless anything
            to the contrary in the foregoing, you are and shall be solely
            responsible to verify and ensure the successful renewal of the
            Reachoout’s Services you use (whether or not such Provider’s
            Services are subject to automatic subscription renewals).
            Accordingly, you shall be solely responsible with respect to any
            discontinuation of any Reachoout’s services previously purchased by
            you, including due to a cancellation, failure to charge the
            applicable recurring Fees, or due to any its services not being
            subject to automatic subscription renewals. You acknowledge and
            agree that you shall not have any claims against Reachoout in
            relation to the discontinuation of any Provider’s services or
            Third-Party Services, for whatever reason.
          </p>
          <p>
            Certain domains are subject to a different renewal policy as
            detailed in the Domains Registration Agreement. Nonetheless anything
            to the contrary in the foregoing, you are and shall be solely
            responsible to verify and ensure the successful renewal of the
            Reachoout’s Services you use (whether or not such Provider’s
            Services are subject to automatic subscription renewals).
            Accordingly, you shall be solely responsible with respect to any
            discontinuation of any Reachoout’s services previously purchased by
            you, including due to a cancellation, failure to charge the
            applicable recurring Fees, or due to any its services not being
            subject to automatic subscription renewals. You acknowledge and
            agree that you shall not have any claims against Reachoout in
            relation to the discontinuation of any Provider’s services or
            Third-Party Services, for whatever reason.
          </p>
          <p>
            Certain domains are subject to a different renewal policy as
            detailed in the Domains Registration Agreement. Nonetheless anything
            to the contrary in the foregoing, you are and shall be solely
            responsible to verify and ensure the successful renewal of the
            Reachoout’s Services you use (whether or not such Provider’s
            Services are subject to automatic subscription renewals).
            Accordingly, you shall be solely responsible with respect to any
            discontinuation of any Reachoout’s services previously purchased by
            you, including due to a cancellation, failure to charge the
            applicable recurring Fees, or due to any its services not being
            subject to automatic subscription renewals. You acknowledge and
            agree that you shall not have any claims against Reachoout in
            relation to the discontinuation of any Provider’s services or
            Third-Party Services, for whatever reason.
          </p>
        <p>
          It will be able to publish the new terms and they will be effective
          from their date of publication.
        </p>
        <p>
          General Terms: In the event, the Provider transferred the rights, or
          any part thereof to a third party, the third party will be entitled to
          forfeit his rights under these terms and conditions. Such regulations
          are added to any other regulations found within the system and in the
          case of a discrepancy, they have precedence.
        </p>
        <p>
          Non-compliance with any section of this document will be considered
          cause to terminate the client’s account immediately and without any
          prior warning.
        </p>
        <p>
          Reachoout will be entitled to terminate the accounts of those who
          violate these terms of use in whole or in part.
        </p>
      </>
    ),
  },
];
export const TermsOfUse = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white font-Inter">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl leading-16 md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-100 to-orange-400 bg-clip-text text-transparent">
              Terms of Use
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Use of the Reachoout services is subject to the following terms of
              use. Please read these terms carefully, as the use of the
              Reachoout or surfing the servers of the Reachoout constitutes your
              agreement to all such terms and conditions.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {STATIC_CONTENT.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10"
              >
                <h2 className="text-2xl font-semibold mb-4 text-orange-400">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-4 text-gray-300">{section.content}</div>
              </motion.section>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-xl border border-orange-500/20"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              Questions About Terms?
            </h3>
            <p className="text-gray-300 mb-4">
              If you have any questions about our terms of use, please don't
              hesitate to contact us.
            </p>
            <a
              href="mailto:contact@reachoout.com"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-1"
          >
            <Image
              src="/reachout-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer object-cover size-[50px] md:size-[50px]"
            />
            <span className="font-semibold text-xl">Reachoout</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-8 text-gray-400"
          >
            <a
              href="https://reachoout.com"
              className="hover:text-white transition"
            >
              Home
            </a>
            <a
              href="https://reachoout.com/support"
              className="hover:text-white transition"
            >
              Support
            </a>
            <a
              href="https://reachoout.com/resources"
              className="hover:text-white transition"
            >
              Tutorials
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

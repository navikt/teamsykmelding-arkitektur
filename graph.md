# Dependency graph

```mermaid
flowchart LR

    internal-users>Internal users]
    external-users>External users]


    subgraph dinesykmeldte-backend-parent[dinesykmeldte-backend]
    direction TB
    dinesykmeldte-backend-app[dinesykmeldte-backend]
    dinesykmeldte-backend-dinesykmeldte-backend-db-instance[("dinesykmeldte-backend")]
    dinesykmeldte-backend-app --> dinesykmeldte-backend-dinesykmeldte-backend-db-instance

    end

    subgraph sykmeldinger-backend-kafka-parent[sykmeldinger-backend-kafka]
    direction TB
    sykmeldinger-backend-kafka-app[sykmeldinger-backend-kafka]


    end

    subgraph syfosmmanuell-backend-parent[syfosmmanuell-backend]
    direction TB
    syfosmmanuell-backend-app[syfosmmanuell-backend]
    syfosmmanuell-backend-syfosmmanuell-backend-instance[("syfosmmanuell-backend")]
    syfosmmanuell-backend-app --> syfosmmanuell-backend-syfosmmanuell-backend-instance

    end

    subgraph syfosmvarsel-parent[syfosmvarsel]
    direction TB
    syfosmvarsel-app[syfosmvarsel]
    syfosmvarsel-smvarsel-instance[("smvarsel")]
    syfosmvarsel-app --> syfosmvarsel-smvarsel-instance

    end

    subgraph syfosmoppgave-parent[syfosmoppgave]
    direction TB
    syfosmoppgave-app[syfosmoppgave]


    end

    subgraph smregistrering-parent[smregistrering]
    direction TB
    smregistrering-app[smregistrering]


    smregistrering-azure-sidecar[azure sidecar]
    smregistrering-azure-sidecar --> smregistrering-app

    end

    subgraph syfosmpapirmottak-parent[syfosmpapirmottak]
    direction TB
    syfosmpapirmottak-app[syfosmpapirmottak]


    end

    subgraph syfosmmottak-parent[syfosmmottak]
    direction TB
    syfosmmottak-app[syfosmmottak]
    syfosmmottak-syfosmmottak-instance[("syfosmmottak")]
    syfosmmottak-app --> syfosmmottak-syfosmmottak-instance

    end

    subgraph macgyver-frontend-parent[macgyver-frontend]
    direction TB
    macgyver-frontend-app[macgyver-frontend]


    macgyver-frontend-azure-sidecar[azure sidecar]
    macgyver-frontend-azure-sidecar --> macgyver-frontend-app

    end

    subgraph syfosmoppgave-stream-parent[syfosmoppgave-stream]
    direction TB
    syfosmoppgave-stream-app[syfosmoppgave-stream]


    end

    subgraph pale-2-regler-parent[pale-2-regler]
    direction TB
    pale-2-regler-app[pale-2-regler]


    end

    subgraph teamsykmelding-pik-2-parent[teamsykmelding-pik-2]
    direction TB
    teamsykmelding-pik-2-app[teamsykmelding-pik-2]


    end

    subgraph syfonlaltinn-parent[syfonlaltinn]
    direction TB
    syfonlaltinn-app[syfonlaltinn]
    syfonlaltinn-syfonlaltinn[("syfonlaltinn")]
    syfonlaltinn-app --> syfonlaltinn-syfonlaltinn

    end

    subgraph smarbeidsgiver-pdfgen-parent[smarbeidsgiver-pdfgen]
    direction TB
    smarbeidsgiver-pdfgen-app[smarbeidsgiver-pdfgen]


    end

    subgraph narmesteleder-parent[narmesteleder]
    direction TB
    narmesteleder-app[narmesteleder]
    narmesteleder-narmesteleder-db-instance[("narmesteleder")]
    narmesteleder-app --> narmesteleder-narmesteleder-db-instance

    end

    subgraph teamsykmelding-website-parent[teamsykmelding-website]
    direction TB
    teamsykmelding-website-app[teamsykmelding-website]


    end

    subgraph pale-2-pdfgen-parent[pale-2-pdfgen]
    direction TB
    pale-2-pdfgen-app[pale-2-pdfgen]


    end

    subgraph macgyver-parent[macgyver]
    direction TB
    macgyver-app[macgyver]


    end

    subgraph helsesjekk-bot-parent[helsesjekk-bot]
    direction TB
    helsesjekk-bot-app[helsesjekk-bot]
    helsesjekk-bot-helsesjekk-bot[("helsesjekk-bot")]
    helsesjekk-bot-app --> helsesjekk-bot-helsesjekk-bot

    end

    subgraph sparenaproxy-parent[sparenaproxy]
    direction TB
    sparenaproxy-app[sparenaproxy]
    sparenaproxy-sparenaproxy-db-instance[("sparenaproxy")]
    sparenaproxy-app --> sparenaproxy-sparenaproxy-db-instance

    end

    subgraph narmesteleder-varsel-parent[narmesteleder-varsel]
    direction TB
    narmesteleder-varsel-app[narmesteleder-varsel]
    narmesteleder-varsel-narmesteleder-varsel-db-instance[("narmesteleder-varsel")]
    narmesteleder-varsel-app --> narmesteleder-varsel-narmesteleder-varsel-db-instance

    end

    subgraph syfosmsak-stream-parent[syfosmsak-stream]
    direction TB
    syfosmsak-stream-app[syfosmsak-stream]


    end

    subgraph pale-2-register-parent[pale-2-register]
    direction TB
    pale-2-register-app[pale-2-register]
    pale-2-register-pale-2-register-instance[("pale-2-register")]
    pale-2-register-app --> pale-2-register-pale-2-register-instance

    end

    subgraph syk-dig-backend-parent[syk-dig-backend]
    direction TB
    syk-dig-backend-app[syk-dig-backend]
    syk-dig-backend-syk-dig-backend-db-instance[("syk-dig-backend")]
    syk-dig-backend-app --> syk-dig-backend-syk-dig-backend-db-instance

    end

    subgraph syfosmapprec-parent[syfosmapprec]
    direction TB
    syfosmapprec-app[syfosmapprec]


    end

    subgraph pale-2-parent[pale-2]
    direction TB
    pale-2-app[pale-2]
    pale-2-pale-2-instance[("pale-2")]
    pale-2-app --> pale-2-pale-2-instance

    end

    subgraph sykmeldinger-parent[sykmeldinger]
    direction TB
    sykmeldinger-app[sykmeldinger]


    sykmeldinger-idporten-sidecar[idporten sidecar]
    sykmeldinger-idporten-sidecar --> sykmeldinger-app

    end

    subgraph syfosmpapirregler-parent[syfosmpapirregler]
    direction TB
    syfosmpapirregler-app[syfosmpapirregler]


    end

    subgraph dinesykmeldte-parent[dinesykmeldte]
    direction TB
    dinesykmeldte-app[dinesykmeldte]


    dinesykmeldte-idporten-sidecar[idporten sidecar]
    dinesykmeldte-idporten-sidecar --> dinesykmeldte-app

    end

    subgraph syfosmarena-parent[syfosmarena]
    direction TB
    syfosmarena-app[syfosmarena]


    end

    subgraph syfosmregister-parent[syfosmregister]
    direction TB
    syfosmregister-app[syfosmregister]
    syfosmregister-smregister-instance[("smregister")]
    syfosmregister-app --> syfosmregister-smregister-instance

    end

    subgraph syk-dig-oppgavelytter-parent[syk-dig-oppgavelytter]
    direction TB
    syk-dig-oppgavelytter-app[syk-dig-oppgavelytter]


    end

    subgraph smpdfgen-parent[smpdfgen]
    direction TB
    smpdfgen-app[smpdfgen]


    end

    subgraph pale-2-sak-parent[pale-2-sak]
    direction TB
    pale-2-sak-app[pale-2-sak]


    end

    subgraph narmesteleder-arbeidsforhold-parent[narmesteleder-arbeidsforhold]
    direction TB
    narmesteleder-arbeidsforhold-app[narmesteleder-arbeidsforhold]
    narmesteleder-arbeidsforhold-narmesteleder-arbeidsforhold-db-instance[("narmesteleder-arbeidsforhold")]
    narmesteleder-arbeidsforhold-app --> narmesteleder-arbeidsforhold-narmesteleder-arbeidsforhold-db-instance

    end

    subgraph syfosminfotrygd-parent[syfosminfotrygd]
    direction TB
    syfosminfotrygd-app[syfosminfotrygd]


    end

    subgraph syfosmmanuell-parent[syfosmmanuell]
    direction TB
    syfosmmanuell-app[syfosmmanuell]


    syfosmmanuell-azure-sidecar[azure sidecar]
    syfosmmanuell-azure-sidecar --> syfosmmanuell-app

    end

    subgraph dinesykmeldte-kafka-parent[dinesykmeldte-kafka]
    direction TB
    dinesykmeldte-kafka-app[dinesykmeldte-kafka]


    end

    subgraph sykmeldinger-backend-parent[sykmeldinger-backend]
    direction TB
    sykmeldinger-backend-app[sykmeldinger-backend]
    sykmeldinger-backend-sykmeldinger-db-instance[("sykmeldinger")]
    sykmeldinger-backend-app --> sykmeldinger-backend-sykmeldinger-db-instance

    end

    subgraph syfosmregler-parent[syfosmregler]
    direction TB
    syfosmregler-app[syfosmregler]


    end

    subgraph sykmeldinger-arbeidsgiver-parent[sykmeldinger-arbeidsgiver]
    direction TB
    sykmeldinger-arbeidsgiver-app[sykmeldinger-arbeidsgiver]
    sykmeldinger-arbeidsgiver-sykmeldinger-arbeidsgiver-instance[("sykmeldinger-arbeidsgiver")]
    sykmeldinger-arbeidsgiver-app --> sykmeldinger-arbeidsgiver-sykmeldinger-arbeidsgiver-instance

    end

    subgraph smtss-parent[smtss]
    direction TB
    smtss-app[smtss]


    end

    subgraph syfosmaltinn-parent[syfosmaltinn]
    direction TB
    syfosmaltinn-app[syfosmaltinn]
    syfosmaltinn-syfosmaltinn[("syfosmaltinn")]
    syfosmaltinn-app --> syfosmaltinn-syfosmaltinn

    end

    subgraph smregistrering-backend-parent[smregistrering-backend]
    direction TB
    smregistrering-backend-app[smregistrering-backend]
    smregistrering-backend-smregistrering-instance[("smregistrering")]
    smregistrering-backend-app --> smregistrering-backend-smregistrering-instance

    end

    subgraph syk-dig-parent[syk-dig]
    direction TB
    syk-dig-app[syk-dig]


    syk-dig-azure-sidecar[azure sidecar]
    syk-dig-azure-sidecar --> syk-dig-app

    end

    subgraph syfosmarena-stream-parent[syfosmarena-stream]
    direction TB
    syfosmarena-stream-app[syfosmarena-stream]


    end

    subgraph syfosmsak-parent[syfosmsak]
    direction TB
    syfosmsak-app[syfosmsak]


    end
    subgraph topics
    direction TB

    omrade-helse-etterlevelse-topic[omrade-helse-etterlevelse]


    dinesykmeldte-hendelser-topic[dinesykmeldte-hendelser]


    dinesykmeldte-hendelser-v2-topic[dinesykmeldte-hendelser-v2]


    privat-aktiver-planlagtmelding-topic[privat-aktiver-planlagtmelding]


    syfo-nl-request-topic[syfo-nl-request]


    syfo-nl-invalid-topic[syfo-nl-invalid]


    syfo-narmesteleder-topic[syfo-narmesteleder]


    syfo-narmesteleder-leesah-topic[syfo-narmesteleder-leesah]


    macgyver-sykmelding-endringslogg-topic[macgyver-sykmelding-endringslogg]


    gamle-sykmeldinger-id-topic[gamle-sykmeldinger-id]


    syfo-sendt-sykmelding-topic[syfo-sendt-sykmelding]


    syfo-bekreftet-sykmelding-topic[syfo-bekreftet-sykmelding]


    syfo-mottatt-sykmelding-topic[syfo-mottatt-sykmelding]


    avvist-sykmelding-topic[avvist-sykmelding]


    manuell-behandling-sykmelding-topic[manuell-behandling-sykmelding]


    ok-sykmelding-topic[ok-sykmelding]


    oppgave-journal-opprettet-topic[oppgave-journal-opprettet]


    oppgave-produser-oppgave-topic[oppgave-produser-oppgave]


    papir-sm-registering-topic[papir-sm-registering]


    privat-arena-input-topic[privat-arena-input]


    privat-registrer-oppgave-topic[privat-registrer-oppgave]


    privat-oppgave-retry-topic[privat-oppgave-retry]


    privat-sminfotrygd-retry-topic[privat-sminfotrygd-retry]


    privat-sykmelding-sak-topic[privat-sykmelding-sak]


    syfoservice-mq-topic[syfoservice-mq]


    sykmelding-apprec-topic[sykmelding-apprec]


    sykmelding-behandlingsutfall-topic[sykmelding-behandlingsutfall]


    sykmelding-manuell-topic[sykmelding-manuell]


    sykmeldingstatus-leesah-topic[sykmeldingstatus-leesah]


    sykmelding-historisk-topic[sykmelding-historisk]


    paragraf-i-kode-topic[paragraf-i-kode]


    syk-dig-oppgave-topic[syk-dig-oppgave]


    gamle-sykmeldinger-topic[gamle-sykmeldinger]


    legeerklaering-topic[legeerklaering]

    end
        internal-users --> smregistrering-azure-sidecar
        internal-users --> macgyver-frontend-azure-sidecar
        internal-users --> narmesteleder-app
        internal-users --> teamsykmelding-website-app
        internal-users --> helsesjekk-bot-app
        external-users --> sykmeldinger-idporten-sidecar
        external-users --> dinesykmeldte-idporten-sidecar
        internal-users --> syfosmregister-app
        internal-users --> syfosmmanuell-azure-sidecar
        internal-users --> syk-dig-azure-sidecar

    syfosmmanuell-backend-app --> syfo-tilgangskontroll-app
    syfosminfotrygd-app --> syfosmmanuell-backend-app
    syfosmmanuell-app --> syfosmmanuell-backend-app


    smregistrering-app --> smregistrering-backend-app



    syfosmpapirmottak-app --> syfosmpapirregler-app
    syfosmpapirmottak-app --> smtss-app



    syfosmmottak-app --> syfosmregler-app
    syfosmmottak-app --> clamav-app
    syfosmmottak-app --> smtss-app



    macgyver-frontend-app --> macgyver-app



    macgyver-app --> narmesteleder-app
    macgyver-frontend-app --> macgyver-app


    sparenaproxy-app --> syfosmregister-app
    sparenaproxy-app --> flex-syketilfelle-app



    syk-dig-backend-app --> syfo-tilgangskontroll-app
    syk-dig-app --> syk-dig-backend-app


    pale-2-app --> pale-2-regler-app
    pale-2-app --> clamav-app
    pale-2-app --> smtss-app



    sykmeldinger-app --> sykmeldinger-backend-app
    sykmeldinger-app --> flex-syketilfelle-app
    sykmeldinger-app --> nav-dekoratoren-app



    syfosmpapirregler-app --> syfosmregister-app
    syfosmpapirregler-app --> flex-syketilfelle-app
    syfosmpapirmottak-app --> syfosmpapirregler-app
    smregistrering-backend-app --> syfosmpapirregler-app


    dinesykmeldte-app --> dinesykmeldte-backend-app
    dinesykmeldte-app --> nav-dekoratoren-app



    syfosmarena-app --> smtss-app



    syfosmregister-app --> syfo-tilgangskontroll-app
    syfomodiaperson-app --> syfosmregister-app
    syfomodiaperson-app --> syfosmregister-app
    esyfovarsel-app --> syfosmregister-app
    esyfovarsel-app --> syfosmregister-app
    sparenaproxy-app --> syfosmregister-app
    syfosmregler-app --> syfosmregister-app
    syfosmpapirregler-app --> syfosmregister-app
    smregistrering-backend-app --> syfosmregister-app
    syfosminfotrygd-app --> syfosmregister-app
    smoppslag-app --> syfosmregister-app
    syfooppfolgingsplanservice-app --> syfosmregister-app
    macgyver-app --> syfosmregister-app


    pale-2-sak-app --> pale-2-pdfgen-app



    syfosminfotrygd-app --> syfosmmanuell-backend-app
    syfosminfotrygd-app --> syfosmregister-app
    syfosminfotrygd-app --> flex-syketilfelle-app



    syfosmmanuell-app --> syfosmmanuell-backend-app



    dinesykmeldte-kafka-app --> flex-syketilfelle-app



    syfosmregler-app --> syfosmregister-app
    syfosmregler-app --> flex-syketilfelle-app
    syfosmmottak-app --> syfosmregler-app


    sykmeldinger-arbeidsgiver-app --> narmesteleder-app
    oppfolgingsplan-frontend-app --> sykmeldinger-arbeidsgiver-app
    dialogmote-frontend-app --> sykmeldinger-arbeidsgiver-app


    syfosmaltinn-app --> smarbeidsgiver-pdfgen-app



    smregistrering-backend-app --> syfosmregister-app
    smregistrering-backend-app --> syfosmpapirregler-app
    smregistrering-backend-app --> smtss-app
    smregistrering-backend-app --> syfo-tilgangskontroll-app
    smregistrering-app --> smregistrering-backend-app


    syk-dig-app --> syk-dig-backend-app



    syfosmsak-app --> smpdfgen-app




    omrade-helse-etterlevelse-topic --> spydig-app
    syfosoknad-app --> omrade-helse-etterlevelse-topic
    sykepengesoknad-backend-app --> omrade-helse-etterlevelse-topic
    flex-syketilfelle-app --> omrade-helse-etterlevelse-topic
    teamsykmelding-pik-app --> omrade-helse-etterlevelse-topic
    teamsykmelding-pik-2-app --> omrade-helse-etterlevelse-topic
    sigmund-app --> omrade-helse-etterlevelse-topic
    spre-subsumsjon-app --> omrade-helse-etterlevelse-topic

    dinesykmeldte-hendelser-topic <--> dinesykmeldte-backend-app
    dinesykmeldte-hendelser-topic --> dinesykmeldte-kafka-app
    macgyver-app --> dinesykmeldte-hendelser-topic

    dinesykmeldte-hendelser-v2-topic <--> dinesykmeldte-backend-app
    dinesykmeldte-hendelser-v2-topic --> dinesykmeldte-kafka-app
    sykepengesoknad-narmesteleder-varsler-app --> dinesykmeldte-hendelser-v2-topic
    esyfovarsel-app --> dinesykmeldte-hendelser-v2-topic
    isdialogmote-app --> dinesykmeldte-hendelser-v2-topic
    syfomotebehov-app --> dinesykmeldte-hendelser-v2-topic


    privat-aktiver-planlagtmelding-topic --> sparenaproxy-app
    sparenajob-app --> privat-aktiver-planlagtmelding-topic


    syfo-nl-request-topic --> syfonlaltinn-app
    syfosmaltinn-app --> syfo-nl-request-topic
    narmesteleder-app --> syfo-nl-request-topic
    macgyver-app --> syfo-nl-request-topic

    syfo-nl-invalid-topic <--> syfonlaltinn-app



    syfo-narmesteleder-topic <--> syfosmaltinn-app
    syfo-narmesteleder-topic <--> narmesteleder-app

    syfonlaltinn-app --> syfo-narmesteleder-topic
    smacgyver-app --> syfo-narmesteleder-topic
    narmesteleder-arbeidsforhold-app --> syfo-narmesteleder-topic
    dinesykmeldte-backend-app --> syfo-narmesteleder-topic

    syfo-narmesteleder-leesah-topic <--> narmesteleder-app
    syfo-narmesteleder-leesah-topic --> narmesteleder-varsel-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-narmesteleder-varsler-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-ikke-sendt-altinnvarsel-app
    syfo-narmesteleder-leesah-topic --> sykepengesoknad-backend-app
    syfo-narmesteleder-leesah-topic --> narmesteleder-arbeidsforhold-app
    syfo-narmesteleder-leesah-topic --> isnarmesteleder-app
    syfo-narmesteleder-leesah-topic --> dinesykmeldte-backend-app
    syfo-narmesteleder-leesah-topic --> sykmeldinger-arbeidsgiver-app
    syfo-narmesteleder-leesah-topic --> notifikasjon-bruker-api-writer-app
    syfo-narmesteleder-leesah-topic --> syfosmaltinn-app
    syfo-narmesteleder-leesah-topic --> min-side-arbeidsgiver-api-app
    syfo-narmesteleder-leesah-topic --> dinesykmeldte-kafka-app
    syfo-narmesteleder-leesah-topic --> sykmeldinger-backend-kafka-app


    macgyver-sykmelding-endringslogg-topic <--> macgyver-app



    gamle-sykmeldinger-id-topic <--> macgyver-app



    syfo-sendt-sykmelding-topic <--> macgyver-app
    syfo-sendt-sykmelding-topic --> syfosmaltinn-app
    syfo-sendt-sykmelding-topic --> narmesteleder-varsel-app
    syfo-sendt-sykmelding-topic --> sykmeldinger-arbeidsgiver-app
    syfo-sendt-sykmelding-topic --> sykepengesoknad-backend-app
    syfo-sendt-sykmelding-topic --> flex-syketilfelle-app
    syfo-sendt-sykmelding-topic --> sykepengesoknad-altinn-app
    syfo-sendt-sykmelding-topic --> dinesykmeldte-backend-app
    syfo-sendt-sykmelding-topic --> dinesykmeldte-kafka-app
    syfo-sendt-sykmelding-topic --> min-side-arbeidsgiver-api-app
    syfo-sendt-sykmelding-topic --> sykmeldinger-backend-kafka-app
    syfosmregister-app --> syfo-sendt-sykmelding-topic

    syfo-bekreftet-sykmelding-topic <--> macgyver-app
    syfo-bekreftet-sykmelding-topic --> sykepengesoknad-backend-app
    syfo-bekreftet-sykmelding-topic --> flex-syketilfelle-app
    syfo-bekreftet-sykmelding-topic --> sykmeldinger-backend-kafka-app
    syfosmregister-app --> syfo-bekreftet-sykmelding-topic

    syfo-mottatt-sykmelding-topic <--> macgyver-app
    syfo-mottatt-sykmelding-topic --> flex-syketilfelle-app
    syfosmregister-app --> syfo-mottatt-sykmelding-topic

    avvist-sykmelding-topic <--> syfosmregister-app
    avvist-sykmelding-topic --> syfosmvarsel-app
    avvist-sykmelding-topic --> syfosmsak-stream-app
    avvist-sykmelding-topic --> sykmeldinger-backend-kafka-app
    avvist-sykmelding-topic --> k143566-app
    syfosmmottak-app --> avvist-sykmelding-topic

    manuell-behandling-sykmelding-topic <--> syfosmregister-app
    manuell-behandling-sykmelding-topic --> syfosmvarsel-app
    manuell-behandling-sykmelding-topic --> syfosmsak-stream-app
    manuell-behandling-sykmelding-topic --> syfosmarena-stream-app
    manuell-behandling-sykmelding-topic --> sparenaproxy-app
    manuell-behandling-sykmelding-topic --> dvh-sykm-konsument-app
    manuell-behandling-sykmelding-topic --> isdialogmelding-app
    manuell-behandling-sykmelding-topic --> sykmeldinger-backend-kafka-app
    manuell-behandling-sykmelding-topic --> dvh-sykefravar-airflow-kafka-app
    manuell-behandling-sykmelding-topic --> sykepengesoknad-backend-app
    syfosmmottak-app --> manuell-behandling-sykmelding-topic

    ok-sykmelding-topic <--> syfosmregister-app
    ok-sykmelding-topic --> syfosmvarsel-app
    ok-sykmelding-topic --> syfosmsak-stream-app
    ok-sykmelding-topic --> syfosminfotrygd-app
    ok-sykmelding-topic --> syfosmarena-stream-app
    ok-sykmelding-topic --> sparenaproxy-app
    ok-sykmelding-topic --> dvh-sykm-konsument-app
    ok-sykmelding-topic --> isdialogmelding-app
    ok-sykmelding-topic --> sykmeldinger-backend-kafka-app
    ok-sykmelding-topic --> k143566-app
    ok-sykmelding-topic --> dvh-sykefravar-airflow-kafka-app
    ok-sykmelding-topic --> sykepengesoknad-backend-app
    syfosmmottak-app --> ok-sykmelding-topic
    syfosmmanuell-backend-app --> ok-sykmelding-topic
    syfosmpapirmottak-app --> ok-sykmelding-topic
    smregistrering-backend-app --> ok-sykmelding-topic
    syk-dig-backend-app --> ok-sykmelding-topic
    macgyver-app --> ok-sykmelding-topic


    oppgave-journal-opprettet-topic --> syfosmarena-stream-app
    oppgave-journal-opprettet-topic --> syfosmoppgave-stream-app
    syfosmsak-app --> oppgave-journal-opprettet-topic


    oppgave-produser-oppgave-topic --> syfosmoppgave-stream-app
    syfosmmottak-app --> oppgave-produser-oppgave-topic
    syfosmmanuell-backend-app --> oppgave-produser-oppgave-topic
    syfosmpapirmottak-app --> oppgave-produser-oppgave-topic
    syfosmsak-app --> oppgave-produser-oppgave-topic
    syfosminfotrygd-app --> oppgave-produser-oppgave-topic


    papir-sm-registering-topic --> smregistrering-backend-app
    syfosmpapirmottak-app --> papir-sm-registering-topic
    macgyver-app --> papir-sm-registering-topic

    privat-arena-input-topic <--> syfosmarena-app
    privat-arena-input-topic <--> syfosmarena-stream-app




    privat-registrer-oppgave-topic --> syfosmoppgave-app
    syfosmoppgave-stream-app --> privat-registrer-oppgave-topic

    privat-oppgave-retry-topic <--> syfosmoppgave-app



    privat-sminfotrygd-retry-topic <--> syfosminfotrygd-app



    privat-sykmelding-sak-topic <--> syfosmsak-app
    privat-sykmelding-sak-topic <--> syfosmsak-stream-app




    syfoservice-mq-topic --> syfoservice-mq-producer-app
    macgyver-app --> syfoservice-mq-topic
    syfosmpapirmottak-app --> syfoservice-mq-topic
    syfosmpapirmottak-app --> syfoservice-mq-topic
    syfosmmanuell-backend-app --> syfoservice-mq-topic
    smregistrering-backend-app --> syfoservice-mq-topic


    sykmelding-apprec-topic --> syfosmapprec-app
    syfosmmottak-app --> sykmelding-apprec-topic
    syfosmmanuell-backend-app --> sykmelding-apprec-topic

    sykmelding-behandlingsutfall-topic <--> syfosmregister-app
    sykmelding-behandlingsutfall-topic --> syfosmsak-stream-app
    sykmelding-behandlingsutfall-topic --> sykmeldinger-backend-kafka-app
    syfosmmottak-app --> sykmelding-behandlingsutfall-topic
    macgyver-app --> sykmelding-behandlingsutfall-topic
    syfosminfotrygd-app --> sykmelding-behandlingsutfall-topic


    sykmelding-manuell-topic --> syfosmmanuell-backend-app
    syfosmmottak-app --> sykmelding-manuell-topic
    macgyver-app --> sykmelding-manuell-topic

    sykmeldingstatus-leesah-topic <--> syfosmregister-app
    sykmeldingstatus-leesah-topic <--> macgyver-app
    sykmeldingstatus-leesah-topic --> syfosmvarsel-app
    sykmeldingstatus-leesah-topic --> sykmeldinger-backend-kafka-app
    sykmeldingstatus-leesah-topic --> isoppfolgingstilfelle-app
    sykmeldinger-backend-app --> sykmeldingstatus-leesah-topic

    sykmelding-historisk-topic <--> macgyver-app
    sykmelding-historisk-topic --> sykmeldinger-backend-kafka-app



    paragraf-i-kode-topic --> teamsykmelding-pik-app
    paragraf-i-kode-topic --> teamsykmelding-pik-2-app
    syfosmregler-app --> paragraf-i-kode-topic
    syfosmpapirregler-app --> paragraf-i-kode-topic


    syk-dig-oppgave-topic --> syk-dig-backend-app
    syfosmpapirmottak-app --> syk-dig-oppgave-topic
    syk-dig-oppgavelytter-app --> syk-dig-oppgave-topic

    gamle-sykmeldinger-topic <--> macgyver-app
    gamle-sykmeldinger-topic --> sykmeldinger-backend-kafka-app


    legeerklaering-topic <--> macgyver-app
    legeerklaering-topic --> pale-2-sak-app
    legeerklaering-topic --> pale-2-register-app
    legeerklaering-topic --> k143566-app
    legeerklaering-topic --> isbehandlerdialog-app
    pale-2-app --> legeerklaering-topic

    subgraph teamsykefravr[teamsykefravr]
    direction TB
    syfo-tilgangskontroll-app[syfo-tilgangskontroll]
    isdialogmote-app[isdialogmote]
    isbehandlerdialog-app[isbehandlerdialog]
    syfo-tilgangskontroll-app[syfo-tilgangskontroll]
    syfo-tilgangskontroll-app[syfo-tilgangskontroll]
    syfomodiaperson-app[syfomodiaperson]
    syfomodiaperson-app[syfomodiaperson]
    padm2-app[padm2]
    syfo-tilgangskontroll-app[syfo-tilgangskontroll]
    isdialogmote-app[isdialogmote]
    isnarmesteleder-app[isnarmesteleder]
    isdialogmelding-app[isdialogmelding]
    isdialogmelding-app[isdialogmelding]
    isoppfolgingstilfelle-app[isoppfolgingstilfelle]
    isbehandlerdialog-app[isbehandlerdialog]
    end

    subgraph nais-system[nais-system]
    direction TB
    clamav-app[clamav]
    clamav-app[clamav]
    end

    subgraph team-esyfo[team-esyfo]
    direction TB
    syfobrukertilgang-app[syfobrukertilgang]
    syfobrukertilgang-app[syfobrukertilgang]
    syfooppfolgingsplanservice-app[syfooppfolgingsplanservice]
    esyfovarsel-app[esyfovarsel]
    esyfovarsel-app[esyfovarsel]
    esyfovarsel-app[esyfovarsel]
    syfooppfolgingsplanservice-app[syfooppfolgingsplanservice]
    oppfolgingsplan-frontend-app[oppfolgingsplan-frontend]
    dialogmote-frontend-app[dialogmote-frontend]
    esyfovarsel-app[esyfovarsel]
    syfomotebehov-app[syfomotebehov]
    end

    subgraph fager[fager]
    direction TB
    notifikasjon-bruker-api-app[notifikasjon-bruker-api]
    notifikasjon-bruker-api-writer-app[notifikasjon-bruker-api-writer]
    min-side-arbeidsgiver-api-app[min-side-arbeidsgiver-api]
    min-side-arbeidsgiver-api-app[min-side-arbeidsgiver-api]
    end

    subgraph flex[flex]
    direction TB
    ditt-sykefravaer-app[ditt-sykefravaer]
    flex-syketilfelle-app[flex-syketilfelle]
    flex-syketilfelle-app[flex-syketilfelle]
    flex-syketilfelle-app[flex-syketilfelle]
    flex-syketilfelle-app[flex-syketilfelle]
    flex-syketilfelle-app[flex-syketilfelle]
    ditt-sykefravaer-app[ditt-sykefravaer]
    sykepengesoknad-app[sykepengesoknad]
    flex-syketilfelle-app[flex-syketilfelle]
    syfosoknad-app[syfosoknad]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    flex-syketilfelle-app[flex-syketilfelle]
    sykepengesoknad-narmesteleder-varsler-app[sykepengesoknad-narmesteleder-varsler]
    sykepengesoknad-narmesteleder-varsler-app[sykepengesoknad-narmesteleder-varsler]
    sykepengesoknad-ikke-sendt-altinnvarsel-app[sykepengesoknad-ikke-sendt-altinnvarsel]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    flex-syketilfelle-app[flex-syketilfelle]
    sykepengesoknad-altinn-app[sykepengesoknad-altinn]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    flex-syketilfelle-app[flex-syketilfelle]
    flex-syketilfelle-app[flex-syketilfelle]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    sykepengesoknad-backend-app[sykepengesoknad-backend]
    end

    subgraph personbruker[personbruker]
    direction TB
    nav-dekoratoren-app[nav-dekoratoren]
    nav-dekoratoren-app[nav-dekoratoren]
    end

    subgraph risk[risk]
    direction TB
    smoppslag-app[smoppslag]
    sigmund-app[sigmund]
    end

    subgraph tbd[tbd]
    direction TB
    spydig-app[spydig]
    spre-subsumsjon-app[spre-subsumsjon]
    end

    subgraph disykefravar[disykefravar]
    direction TB
    dvh-sykm-konsument-app[dvh-sykm-konsument]
    dvh-sykefravar-airflow-kafka-app[dvh-sykefravar-airflow-kafka]
    dvh-sykm-konsument-app[dvh-sykm-konsument]
    dvh-sykefravar-airflow-kafka-app[dvh-sykefravar-airflow-kafka]
    end

```
